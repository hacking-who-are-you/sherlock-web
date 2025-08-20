import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Loader2, AlertTriangle } from "lucide-react";
import { Vulnerability } from "../types/vulnerability";

interface AIAnalysisPanelProps {
  vulnerability: Vulnerability;
  url: string;
}

export function AIAnalysisPanel({ vulnerability, url }: AIAnalysisPanelProps) {
  const [analysis, setAnalysis] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setAnalysis("");

    try {
      const res = await fetch("/api/analyze-vulnerability", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vulnerability,
          evidence: vulnerability.evidence,
          url,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to get AI analysis");
      }

      // Handle streaming response
      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let fullResponse = "";

      if (reader) {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          fullResponse += chunk;
          setAnalysis(fullResponse);
        }
      }
    } catch (error) {
      setAnalysis("Error: Failed to get AI analysis. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "bg-red-600";
      case "High":
        return "bg-orange-500";
      case "Medium":
        return "bg-yellow-500";
      case "Low":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card className="bg-slate-900 border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-cyan-400 flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Security Analysis
          </CardTitle>
          <Badge
            className={`${getSeverityColor(vulnerability.severity)} text-white`}
          >
            {vulnerability.severity}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-orange-400">
            <AlertTriangle className="h-4 w-4" />
            <span className="font-medium">{vulnerability.type}</span>
          </div>
          <p className="text-slate-300 text-sm">{vulnerability.description}</p>
        </div>

        {!analysis && (
          <Button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="w-full bg-cyan-600 hover:bg-cyan-700"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing with AI...
              </>
            ) : (
              <>
                <Brain className="mr-2 h-4 w-4" />
                Get AI Analysis
              </>
            )}
          </Button>
        )}

        {analysis && (
          <div className="space-y-3">
            <div className="border-t border-slate-700 pt-3">
              <h4 className="text-cyan-400 font-medium mb-2">
                AI Analysis Results:
              </h4>
              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                <pre className="text-slate-300 text-sm whitespace-pre-wrap font-mono">
                  {analysis}
                </pre>
              </div>
            </div>
            {!isAnalyzing && (
              <Button
                onClick={handleAnalyze}
                variant="outline"
                size="sm"
                className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
              >
                <Brain className="mr-2 h-4 w-4" />
                Re-analyze
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
