import { Project, MethodDeclaration, PropertyDeclaration, SyntaxKind } from "ts-morph";

// Створення проекту та додавання файлів для оцінки метрик
const project = new Project();
project.addSourceFilesAtPaths("node_modules/typeorm/**/*.ts");
//project.addSourceFilesAtPaths("src/countries/**/*.ts");

interface ClassInfo {
  name: string;
  methods: MethodDeclaration[];
  properties: PropertyDeclaration[];
  baseClasses: string[];
  children: string[];
  DIT?: number;
  NOC?: number;
}

const classes: { [name: string]: ClassInfo } = {};

// Отримання інформації про класи
project.getSourceFiles().forEach(sourceFile => {
  sourceFile.getClasses().forEach(classDeclaration => {
    const className = classDeclaration.getName();
    if (className) {
      const baseClasses = classDeclaration.getExtends() ? [classDeclaration.getExtends()!.getText()] : [];
      const methods = classDeclaration.getMethods();
      const properties = classDeclaration.getProperties();

      classes[className] = {
        name: className,
        methods: methods,
        properties: properties,
        baseClasses: baseClasses,
        children: []
      };
    }
  });
});

Object.values(classes).forEach(classInfo => {
  classInfo.baseClasses.forEach(baseClassName => {
    if (classes[baseClassName]) {
      classes[baseClassName].children.push(classInfo.name);
    }
  });
});

function calculateDIT(classInfo: ClassInfo, currentDepth: number = 0): number {
  if (!classInfo || classInfo?.baseClasses.length === 0) {
    return currentDepth;
  }
  return Math.max(...classInfo.baseClasses.map(baseClassName => calculateDIT(classes[baseClassName], currentDepth + 1)));
}

// Додавання DIT і NOC для кожного класу
Object.values(classes).forEach(classInfo => {
  classInfo.DIT = calculateDIT(classInfo);
  classInfo.NOC = classInfo.children.length;
});

// Обчислення MOOD метрик
function calculateMIF(): number {
  const inheritedMethods = Object.values(classes).reduce((sum, classInfo) => {
    return sum + classInfo.methods.filter(method => {
      return classInfo.baseClasses.some(baseClassName => {
        const baseClass = classes[baseClassName];
        return baseClass && baseClass.methods.some(baseMethod => baseMethod.getName() === method.getName());
      });
    }).length;
  }, 0);
  const allMethods = Object.values(classes).reduce((sum, classInfo) => sum + classInfo.methods.length, 0);
  return inheritedMethods / allMethods;
}

function calculateMHF(): number {
  const totalMethods = Object.values(classes).reduce((sum, classInfo) => sum + classInfo.methods.length, 0);
  const hiddenMethods = Object.values(classes).reduce((sum, classInfo) => {
    return sum + classInfo.methods.filter(method => method.getScope() === "private").length;
  }, 0);
  return hiddenMethods / totalMethods;
}

function calculateAHF(): number {
  const totalProperties = Object.values(classes).reduce((sum, classInfo) => sum + classInfo.properties.length, 0);
  const hiddenProperties = Object.values(classes).reduce((sum, classInfo) => {
      return sum + classInfo.properties.filter(property => property.getScope() === "private").length;
  }, 0);
  return hiddenProperties / totalProperties;
}

function calculateAIF(): number {
  const inheritedProperties = Object.values(classes).reduce((sum, classInfo) => {
    return sum + classInfo.properties.filter(method => {
      return classInfo.baseClasses.some(baseClassName => {
        const baseClass = classes[baseClassName];
        return baseClass && baseClass.properties.some(baseMethod => baseMethod.getName() === method.getName());
      });
    }).length;
  }, 0);
  const allProperties = Object.values(classes).reduce((sum, classInfo) => sum + classInfo.properties.length, 0);
  return inheritedProperties / allProperties;
}

function calculatePOF(): number {
  const polymorphicMethods = Object.values(classes).reduce((sum, classInfo) => {
    return sum + classInfo.methods.filter(method => {
      return method.findReferencesAsNodes().some(refNode => {
        const refMethod = refNode.getParentIfKind(SyntaxKind.MethodDeclaration);
        return refMethod && refMethod.getParentIfKind(SyntaxKind.ClassDeclaration) !== method.getParentIfKind(SyntaxKind.ClassDeclaration);
      });
    }).length;
  }, 0);
  const totalMethods = Object.values(classes).reduce((sum, classInfo) => sum + classInfo.methods.length, 0);
  return polymorphicMethods / totalMethods;
}

const moodMetrics = {
  MIF: calculateMIF(),
  MHF: calculateMHF(),
  AHF: calculateAHF(),
  AIF: calculateAIF(),
  POF: calculatePOF(),
};

console.log(classes);
console.log(moodMetrics);
