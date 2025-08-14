import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  Brain, 
  Cpu, 
  Globe, 
  Settings, 
  Rocket,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Cloud,
  Zap,
  Shield,
  DollarSign
} from "lucide-react";

interface DeploymentConfig {
  model: string;
  modelSize: string;
  provider: string;
  region: string;
  instanceType: string;
  apiKey: string;
  rateLimiting: string;
  ipAllowlist: string;
}

const models = [
  { id: "gpt-4", name: "GPT-4", provider: "OpenAI", description: "Most capable model, best for complex tasks" },
  { id: "claude-3", name: "Claude-3", provider: "Anthropic", description: "Great for analysis and creative tasks" },
  { id: "llama-2-70b", name: "Llama 2 70B", provider: "Meta", description: "Open source, good for general tasks" },
  { id: "custom", name: "Custom Model", provider: "Your Model", description: "Deploy your own fine-tuned model" }
];

const providers = [
  { id: "aws", name: "Amazon Web Services", icon: "☁️", regions: ["us-east-1", "us-west-2", "eu-west-1", "ap-southeast-1"] },
  { id: "gcp", name: "Google Cloud Platform", icon: "🌐", regions: ["us-central1", "us-east1", "europe-west1", "asia-southeast1"] },
  { id: "azure", name: "Microsoft Azure", icon: "⚡", regions: ["eastus", "westus2", "westeurope", "southeastasia"] }
];

export default function Deploy() {
  const [currentStep, setCurrentStep] = useState(1);
  const [config, setConfig] = useState<DeploymentConfig>({
    model: "",
    modelSize: "",
    provider: "",
    region: "",
    instanceType: "",
    apiKey: "",
    rateLimiting: "1000",
    ipAllowlist: ""
  });

  const steps = [
    { number: 1, title: "Choose AI Model", icon: Brain },
    { number: 2, title: "Infrastructure", icon: Cloud },
    { number: 3, title: "Configuration", icon: Settings },
    { number: 4, title: "Deploy", icon: Rocket }
  ];

  const canProceed = () => {
    switch (currentStep) {
      case 1: return config.model && config.modelSize;
      case 2: return config.provider && config.region && config.instanceType;
      case 3: return config.apiKey && config.rateLimiting;
      default: return true;
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Select AI Model</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {models.map((model) => (
            <Card 
              key={model.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                config.model === model.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setConfig(prev => ({ ...prev, model: model.id }))}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{model.name}</h4>
                  <Badge variant="outline">{model.provider}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{model.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Model Size & Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["small", "medium", "large"].map((size) => (
            <Card 
              key={size}
              className={`cursor-pointer transition-all hover:shadow-md ${
                config.modelSize === size ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setConfig(prev => ({ ...prev, modelSize: size }))}
            >
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Cpu className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-medium capitalize">{size}</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {size === "small" && "Fast & Cost-effective"}
                  {size === "medium" && "Balanced Performance"}
                  {size === "large" && "Maximum Capability"}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Cloud Provider</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {providers.map((provider) => (
            <Card 
              key={provider.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                config.provider === provider.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setConfig(prev => ({ ...prev, provider: provider.id, region: "" }))}
            >
              <CardContent className="p-4 text-center">
                <div className="text-2xl mb-2">{provider.icon}</div>
                <h4 className="font-medium">{provider.name}</h4>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {config.provider && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="region">Region</Label>
            <Select value={config.region} onValueChange={(value) => setConfig(prev => ({ ...prev, region: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                {providers.find(p => p.id === config.provider)?.regions.map((region) => (
                  <SelectItem key={region} value={region}>{region}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="instance">Suggested Instance Type</Label>
            <Select value={config.instanceType} onValueChange={(value) => setConfig(prev => ({ ...prev, instanceType: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select instance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">t3.medium - $50/month</SelectItem>
                <SelectItem value="medium">c5.large - $120/month</SelectItem>
                <SelectItem value="large">c5.2xlarge - $280/month</SelectItem>
                <SelectItem value="gpu">p3.2xlarge - $900/month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {config.instanceType && (
        <Card className="bg-muted/50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <DollarSign className="h-5 w-5 text-green-600" />
              <div>
                <h4 className="font-medium">Estimated Monthly Cost</h4>
                <p className="text-sm text-muted-foreground">
                  Based on your selections: ~$
                  {config.instanceType === "small" ? "50" : 
                   config.instanceType === "medium" ? "120" : 
                   config.instanceType === "large" ? "280" : "900"}
                  /month
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Security & API Configuration</h3>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <Label htmlFor="apiKey">API Key (Stored Securely)</Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="Enter your API key"
              value={config.apiKey}
              onChange={(e) => setConfig(prev => ({ ...prev, apiKey: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="rateLimiting">Rate Limiting (requests per minute)</Label>
            <Select value={config.rateLimiting} onValueChange={(value) => setConfig(prev => ({ ...prev, rateLimiting: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="100">100 RPM - Basic</SelectItem>
                <SelectItem value="500">500 RPM - Standard</SelectItem>
                <SelectItem value="1000">1000 RPM - Professional</SelectItem>
                <SelectItem value="5000">5000 RPM - Enterprise</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="ipAllowlist">IP Allowlist (Optional)</Label>
            <Textarea
              id="ipAllowlist"
              placeholder="192.168.1.1, 10.0.0.0/8 (one per line)"
              value={config.ipAllowlist}
              onChange={(e) => setConfig(prev => ({ ...prev, ipAllowlist: e.target.value }))}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Leave empty to allow all IPs
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-muted/50">
          <CardContent className="p-4 text-center">
            <Shield className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <h4 className="font-medium">Encrypted Storage</h4>
            <p className="text-xs text-muted-foreground">API keys encrypted at rest</p>
          </CardContent>
        </Card>
        <Card className="bg-muted/50">
          <CardContent className="p-4 text-center">
            <Zap className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <h4 className="font-medium">Auto-scaling</h4>
            <p className="text-xs text-muted-foreground">Handles traffic spikes</p>
          </CardContent>
        </Card>
        <Card className="bg-muted/50">
          <CardContent className="p-4 text-center">
            <Globe className="h-6 w-6 text-purple-600 mx-auto mb-2" />
            <h4 className="font-medium">Global CDN</h4>
            <p className="text-xs text-muted-foreground">Low latency worldwide</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-4">Review & Deploy</h3>
        <p className="text-muted-foreground">
          Review your configuration and deploy your AI model
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Deployment Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Model</p>
              <p className="font-medium">{models.find(m => m.id === config.model)?.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Size</p>
              <p className="font-medium capitalize">{config.modelSize}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Provider</p>
              <p className="font-medium">{providers.find(p => p.id === config.provider)?.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Region</p>
              <p className="font-medium">{config.region}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Instance</p>
              <p className="font-medium">{config.instanceType}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Rate Limit</p>
              <p className="font-medium">{config.rateLimiting} RPM</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-6 text-center">
          <Rocket className="h-12 w-12 text-primary mx-auto mb-4" />
          <h4 className="text-lg font-semibold mb-2">Ready to Deploy!</h4>
          <p className="text-muted-foreground mb-4">
            Your AI model will be provisioned and available within 5-10 minutes
          </p>
          <Button size="lg" className="w-full">
            <Rocket className="h-5 w-5 mr-2" />
            Deploy Now
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      default: return renderStep1();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">AI Deployment Wizard</h1>
          <p className="text-muted-foreground">
            Deploy your AI model to the cloud in 4 simple steps
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-colors ${
                currentStep >= step.number 
                  ? 'bg-primary border-primary text-primary-foreground' 
                  : 'border-muted-foreground text-muted-foreground'
              }`}>
                {currentStep > step.number ? (
                  <CheckCircle className="h-6 w-6" />
                ) : (
                  <step.icon className="h-6 w-6" />
                )}
              </div>
              <div className="ml-3">
                <p className={`text-sm font-medium ${
                  currentStep >= step.number ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  Step {step.number}
                </p>
                <p className={`text-xs ${
                  currentStep >= step.number ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step.title}
                </p>
              </div>
              
              {index < steps.length - 1 && (
                <ArrowRight className="h-4 w-4 text-muted-foreground mx-4" />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <Card className="mb-8">
          <CardContent className="p-8">
            {renderCurrentStep()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          
          {currentStep < 4 ? (
            <Button 
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={!canProceed()}
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button disabled>
              Deployment Complete
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}
