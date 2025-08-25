import { ReactNode } from "react";

interface SyntaxHighlighterProps {
  code: string;
  language?: "json" | "javascript";
  className?: string;
}

export function SyntaxHighlighter({ 
  code, 
  language = "json",
  className = "" 
}: SyntaxHighlighterProps) {
  const highlightJSON = (jsonString: string): ReactNode => {
    try {
      const obj = JSON.parse(jsonString);
      const formatted = JSON.stringify(obj, null, 2);
      
      return formatted.split('\n').map((line, index) => (
        <div key={index} className="leading-relaxed">
          {highlightLine(line)}
        </div>
      ));
    } catch {
      return <span className="text-destructive">Invalid JSON</span>;
    }
  };

  const highlightLine = (line: string): ReactNode => {
    // Property names (keys)
    line = line.replace(
      /"([^"]+)":/g, 
      '<span class="syntax-property">"$1"</span>:'
    );
    
    // String values
    line = line.replace(
      /:\s*"([^"]*)"/g, 
      ': <span class="syntax-string">"$1"</span>'
    );
    
    // Numbers
    line = line.replace(
      /:\s*(\d+\.?\d*)/g, 
      ': <span class="syntax-number">$1</span>'
    );
    
    // Booleans
    line = line.replace(
      /:\s*(true|false)/g, 
      ': <span class="syntax-boolean">$1</span>'
    );
    
    // Null
    line = line.replace(
      /:\s*(null)/g, 
      ': <span class="syntax-null">$1</span>'
    );
    
    // Brackets and braces
    line = line.replace(
      /([{}[\]])/g, 
      '<span class="syntax-keyword">$1</span>'
    );

    return <span dangerouslySetInnerHTML={{ __html: line }} />;
  };

  return (
    <pre className={`font-mono text-sm p-6 bg-card rounded-lg border overflow-auto ${className}`}>
      <code>
        {language === "json" ? highlightJSON(code) : code}
      </code>
    </pre>
  );
}