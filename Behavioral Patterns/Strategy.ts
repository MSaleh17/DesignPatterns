interface TextFormatter {
  format(text: string): string;
}

class UpperCaseFormatter implements TextFormatter {
  format(text: string): string {
    return text.toUpperCase();
  }
}

class LowerCaseFormatter implements TextFormatter {
  format(text: string): string {
    return text.toLowerCase();
  }
}

class TextEditor {
  constructor(private text: string, private _formatStrategy: TextFormatter) {}

  set formatStrategy(newFormatStrategy: TextFormatter) {
    this._formatStrategy = newFormatStrategy;
  }

  format() {
    return this._formatStrategy.format(this.text);
  }
}

const upperCaseFormatter = new UpperCaseFormatter();
const lowerCaseFormatter = new LowerCaseFormatter();

const t = "Hello World ";
const textEditor = new TextEditor(t, upperCaseFormatter);
console.log(textEditor.format());

textEditor.formatStrategy = lowerCaseFormatter;

console.log(textEditor.format());
