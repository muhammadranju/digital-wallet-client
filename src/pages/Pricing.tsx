import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, ArrowRight, Users, Building, Crown } from "lucide-react";
import { Link } from "react-router";
import HelmetTitle from "@/components/layout/HelmetTitle";

export default function PricingPage() {
  const plans = [
    {
      name: "Personal",
      description: "Perfect for individuals managing personal finances",
      price: "Free",
      period: "",
      icon: Users,
      popular: false,
      features: [
        "Send & receive money instantly",
        "Up to $5,000 daily limit",
        "Basic transaction history",
        "Mobile app access",
        "Email support",
        "Standard security features",
      ],
      notIncluded: [
        "Priority support",
        "Advanced analytics",
        "Custom limits",
        "API access",
      ],
      cta: "Get Started Free",
      href: "/auth/register",
    },
    {
      name: "Agent",
      description: "For entrepreneurs offering cash-in/out services",
      price: "Commission Based",
      period: "0.5% - 1.5% per transaction",
      icon: Building,
      popular: true,
      features: [
        "All Personal features",
        "Agent dashboard & tools",
        "Commission tracking",
        "Customer management",
        "Higher transaction limits",
        "Priority support",
        "Marketing materials",
        "Training & certification",
      ],
      notIncluded: ["API access", "White-label solutions"],
      cta: "Become an Agent",
      href: "/auth/register",
    },
    {
      name: "Enterprise",
      description: "Custom solutions for large organizations",
      price: "Custom",
      period: "Contact for pricing",
      icon: Crown,
      popular: false,
      features: [
        "All Agent features",
        "Custom integration",
        "API access",
        "White-label solutions",
        "Dedicated support",
        "Custom limits",
        "Advanced analytics",
        "Compliance reporting",
        "Multi-location management",
      ],
      notIncluded: [],
      cta: "Contact Sales",
      href: "/contact",
    },
  ];

  const transactionFees = [
    {
      type: "PayWallet to PayWallet",
      fee: "Free",
      description: "Send money between PayWallet users instantly at no cost",
    },
    {
      type: "Cash-In (via Agent)",
      fee: "1.0% - 2.0%",
      description: "Add money to your wallet through our agent network",
    },
    {
      type: "Cash-Out (via Agent)",
      fee: "1.0% - 2.0%",
      description: "Withdraw cash from your wallet through agents",
    },
    {
      type: "Bank Transfer (Incoming)",
      fee: "Free",
      description: "Add money from your bank account to PayWallet",
    },
    {
      type: "Bank Transfer (Outgoing)",
      fee: "$0.50 - $2.00",
      description: "Transfer money from PayWallet to your bank account",
    },
    {
      type: "Bill Payments",
      fee: "Free - $1.00",
      description: "Pay utilities and services directly from your wallet",
    },
  ];

  const limits = [
    {
      account: "Unverified Personal",
      daily: "$500",
      monthly: "$2,000",
      verification: "Phone number only",
    },
    {
      account: "Verified Personal",
      daily: "$5,000",
      monthly: "$25,000",
      verification: "ID + Address proof",
    },
    {
      account: "Agent Account",
      daily: "$25,000",
      monthly: "$100,000",
      verification: "Business documents + training",
    },
    {
      account: "Enterprise",
      daily: "Custom",
      monthly: "Custom",
      verification: "Custom agreement",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <HelmetTitle title="Pricing" />
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Choose the plan that fits your needs. Start free and upgrade as
              you grow. No hidden fees, no surprises.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative p-8 ${
                  plan.popular ? "border-primary shadow-lg scale-105" : ""
                } hover:shadow-lg transition-all`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                    Most Popular
                  </Badge>
                )}

                <CardHeader className="text-center pb-8">
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <plan.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-base">
                    {plan.description}
                  </CardDescription>
                  <div className="mt-4">
                    <div className="text-4xl font-bold">{plan.price}</div>
                    {plan.period && (
                      <div className="text-muted-foreground text-sm mt-1">
                        {plan.period}
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <Check className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                    {plan.notIncluded.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center space-x-3 opacity-50"
                      >
                        <X className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Button
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                    asChild
                  >
                    <Link to={plan.href}>
                      {plan.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Transaction Fees */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Transaction Fees
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transparent pricing for all transaction types. No hidden fees or
              surprises.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {transactionFees.map((fee, index) => (
                <Card key={index} className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-lg">{fee.type}</h3>
                    <Badge
                      variant="outline"
                      className="text-primary border-primary"
                    >
                      {fee.fee}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {fee.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Transaction Limits */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Transaction Limits
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Higher limits available with account verification. Upgrade your
              verification level to increase limits.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-4 px-4 font-semibold">
                      Account Type
                    </th>
                    <th className="text-left py-4 px-4 font-semibold">
                      Daily Limit
                    </th>
                    <th className="text-left py-4 px-4 font-semibold">
                      Monthly Limit
                    </th>
                    <th className="text-left py-4 px-4 font-semibold">
                      Verification Required
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {limits.map((limit, index) => (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="py-4 px-4 font-medium">{limit.account}</td>
                      <td className="py-4 px-4">{limit.daily}</td>
                      <td className="py-4 px-4">{limit.monthly}</td>
                      <td className="py-4 px-4 text-muted-foreground text-sm">
                        {limit.verification}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Pricing FAQ</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-2">
                Are there any monthly fees?
              </h3>
              <p className="text-muted-foreground">
                No, PayWallet doesn't charge monthly fees for personal accounts.
                You only pay transaction fees when you use specific services
                like cash-out or bank transfers.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-2">
                How do agent commissions work?
              </h3>
              <p className="text-muted-foreground">
                Agents earn 0.5% to 1.5% commission on each transaction they
                facilitate. The exact rate depends on transaction volume,
                location, and service type. Commissions are paid weekly.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-2">
                Can I increase my transaction limits?
              </h3>
              <p className="text-muted-foreground">
                Yes, you can increase limits by completing additional
                verification steps. Upload your ID, proof of address, and
                complete our verification process to unlock higher limits.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-2">
                Is there a fee for failed transactions?
              </h3>
              <p className="text-muted-foreground">
                No, we don't charge fees for failed transactions. If a
                transaction fails due to insufficient funds or other issues, no
                fee is applied to your account.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join millions of users who trust PayWallet for their digital
              transactions. Start with a free account today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8" asChild>
                <Link to="/auth/register">
                  Create Free Account
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
