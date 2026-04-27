# 🧩 TS-OOP-Modular Task Manager

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![OOP](https://img.shields.io/badge/OOP-Design%20Patterns-green.svg)]()
[![ES Modules](https://img.shields.io/badge/ES%20Modules-Modular-yellow.svg)]()
[![Drag & Drop](https://img.shields.io/badge/Drag%20%26%20Drop-Native-orange.svg)]()

A **Task Manager** built with **TypeScript** and **Object-Oriented Programming** principles.  
You can add, drag & drop tasks between different status columns: **To Do → Doing → Done**.

---
## 📸 Screenshot

![Task Manager Demo](./images/shot.png)


## ✨ Features

- ✅ Add new tasks with **title**, **description**, and **hours**
- ✅ Form **validation** for inputs (minLength, maxLength, required, min, max)
- ✅ **Drag & Drop** between 3 columns (To Do, Doing, Done)
- ✅ Clean **OOP architecture**:
  - **Singleton** pattern (`ProjectState`)
  - **Observer** pattern (listeners for UI updates)
  - **Component-based** UI with Generics
  - **Interfaces** for Draggable & DragTarget
- ✅ Custom **@autobind** decorator for event handlers
- ✅ Fully **modular** with **ES Modules**
- ✅ **TypeScript Strict Mode** (no `any` type)

---

## 🛠️ Tech Stack

| Technology | Usage |
|------------|-------|
| TypeScript | Strict mode, Generics, Interfaces, Union Types |
| OOP | Inheritance, Encapsulation, Polymorphism |
| Drag & Drop API | Native HTML5 Drag & Drop |
| ES Modules | Modular architecture |
| CSS3 | Flexbox, Grid, Modern styling, Animations |

---


## 🚀 How to Run

```bash
# 1. Clone the repository
git clone https://github.com/shahbaziparisa/ts-oop-task-manager.git

# 2. Navigate to project folder
cd ts-oop-modular-task-manager

# 3. Install TypeScript (if not installed globally)
npm install -g typescript

# 4. Compile TypeScript
tsc

# 5. Open index.html in your browser
# Or use Live Server extension for better experience

---

User Input (Form)
       ↓
ProjectInput (Validation)
       ↓
ProjectState.addProject()  ← [Singleton]
       ↓
updateListeners()
       ↓
ProjectList (ToDo) ← ProjectList (Doing) ← ProjectList (Done)
       ↓
ProjectItem (Render each task)
       ↓
Drag & Drop between columns
       ↓
ProjectState.moveProject()
       ↓
UI updates automatically (Observer)

---

