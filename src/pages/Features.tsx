import HelmetTitle from "@/components/layout/HelmetTitle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Wallet,
  Shield,
  Zap,
  Users,
  Smartphone,
  BarChart3,
  Lock,
  Clock,
  MapPin,
  Bell,
  Headphones,
  FileText,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router";

export default function FeaturesPage() {
  const coreFeatures = [
    {
      icon: Zap,
      title: "Instant Transfers",
      description:
        "Send money to anyone in seconds with our lightning-fast payment system.",
      benefits: [
        "Real-time processing",
        "24/7 availability",
        "No delays or holds",
      ],
    },
    {
      icon: Shield,
      title: "Bank-Level Security",
      description:
        "Your money and data are protected with military-grade encryption.",
      benefits: [
        "256-bit SSL encryption",
        "Multi-factor authentication",
        "Fraud detection",
      ],
    },
    {
      icon: Smartphone,
      title: "Mobile First Design",
      description:
        "Optimized for mobile with an intuitive interface that anyone can use.",
      benefits: [
        "Touch-friendly interface",
        "Offline capabilities",
        "Cross-platform sync",
      ],
    },
    {
      icon: Users,
      title: "Agent Network",
      description:
        "Access cash through our nationwide network of trusted agents.",
      benefits: ["50,000+ locations", "Cash in/out services", "Extended hours"],
    },
  ];

  const advancedFeatures = [
    {
      icon: BarChart3,
      title: "Spending Analytics",
      description:
        "Track your spending patterns with detailed insights and reports.",
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description:
        "Get instant alerts for all transactions and account activities.",
    },
    {
      icon: Lock,
      title: "Transaction Limits",
      description:
        "Set custom spending limits and controls for enhanced security.",
    },
    {
      icon: Clock,
      title: "Scheduled Payments",
      description: "Set up recurring payments and never miss a bill again.",
    },
    {
      icon: MapPin,
      title: "Location Services",
      description:
        "Find nearby agents and ATMs with our integrated map feature.",
    },
    {
      icon: FileText,
      title: "Digital Receipts",
      description:
        "Automatic receipt generation and storage for all transactions.",
    },
  ];

  const userTypes = [
    {
      title: "Personal Users",
      description: "Perfect for individuals managing their daily finances",
      features: [
        "Send & receive money instantly",
        "Pay bills and utilities",
        "Mobile top-ups",
        "Transaction history",
        "Spending analytics",
        "24/7 customer support",
      ],
      icon: Wallet,
    },
    {
      title: "Business Agents",
      description: "Earn commissions by serving your community",
      features: [
        "Cash-in/cash-out services",
        "Commission tracking",
        "Agent dashboard",
        "Customer management",
        "Real-time reporting",
        "Training & support",
      ],
      icon: Users,
    },
    {
      title: "Administrators",
      description: "Complete system oversight and management",
      features: [
        "User management",
        "Transaction monitoring",
        "System analytics",
        "Agent approval",
        "Security controls",
        "Compliance reporting",
      ],
      icon: Shield,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <HelmetTitle title="Features" />
      {/* <Navbar /> */}

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Powerful Features for Modern Finance
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Discover all the tools and features that make PayWallet the most
              comprehensive digital wallet solution for individuals, agents, and
              businesses.
            </p>
            <Button size="lg" className="text-lg px-8" asChild>
              <Link to="/auth/signup">
                Try All Features Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Core Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The essential features that make PayWallet your go-to digital
              wallet.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {coreFeatures.map((feature, index) => (
              <Card
                key={index}
                className="p-8 hover:shadow-lg transition-shadow"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl mb-2">
                        {feature.title}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {feature.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-sm text-muted-foreground"
                      >
                        <div className="w-1.5 h-1.5 bg-secondary rounded-full mr-3"></div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Advanced Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Additional tools to enhance your financial management experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advancedFeatures.map((feature, index) => (
              <Card
                key={index}
                className="text-center p-6 hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* User Types */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Built for Everyone
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tailored experiences for different user types and needs.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {userTypes.map((type, index) => (
              <Card
                key={index}
                className="p-8 hover:shadow-lg transition-shadow"
              >
                <CardHeader className="text-center pb-6">
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <type.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{type.title}</CardTitle>
                  <CardDescription className="text-base">
                    {type.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {type.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <div className="w-1.5 h-1.5 bg-secondary rounded-full mr-3 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Security You Can Trust
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Your security is our top priority. We use the latest technology
                and best practices to keep your money and personal information
                safe.
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Shield className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-medium">End-to-end encryption</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Lock className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-medium">Biometric authentication</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Bell className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-medium">
                    Real-time fraud monitoring
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Headphones className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-medium">24/7 security support</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="/digital-security-shield.png"
                alt="Security Features"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Experience All Features?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join millions of users who trust PayWallet for their digital
              transactions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8" asChild>
                <Link to="/auth/signup">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 bg-transparent"
                asChild
              >
                <Link to="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
