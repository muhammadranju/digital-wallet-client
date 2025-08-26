import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Shield,
  CreditCard,
  Users,
  Settings,
} from "lucide-react";
import { Link } from "react-router";
import HelmetTitle from "@/components/layout/HelmetTitle";

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [openItems, setOpenItems] = useState<string[]>([]);

  const categories = [
    { id: "all", label: "All Questions", icon: HelpCircle },
    { id: "account", label: "Account & Security", icon: Shield },
    { id: "payments", label: "Payments & Transfers", icon: CreditCard },
    { id: "agents", label: "Agent Services", icon: Users },
    { id: "technical", label: "Technical Support", icon: Settings },
  ];

  const faqs = [
    {
      id: "1",
      category: "account",
      question: "How do I create a PayWallet account?",
      answer:
        "Creating a PayWallet account is simple. Click 'Get Started' on our homepage, fill in your personal information including name, email, phone number, and choose your account type (Personal or Agent). You'll receive a verification code via SMS to confirm your phone number. Once verified, your account will be active and ready to use.",
    },
    {
      id: "2",
      category: "account",
      question: "Is my money safe with PayWallet?",
      answer:
        "Absolutely. PayWallet uses bank-level security measures including 256-bit SSL encryption, multi-factor authentication, and real-time fraud monitoring. Your funds are protected by advanced security protocols, and we maintain partnerships with licensed financial institutions to ensure regulatory compliance.",
    },
    {
      id: "3",
      category: "payments",
      question: "How long do transfers take?",
      answer:
        "PayWallet transfers are instant! Money sent between PayWallet users appears in the recipient's account within seconds. Bank transfers and cash-out transactions through agents typically take 1-3 business days depending on the receiving institution.",
    },
    {
      id: "4",
      category: "payments",
      question: "What are the transaction limits?",
      answer:
        "Transaction limits vary by account type and verification level. Personal accounts can send up to $5,000 per day and $25,000 per month. Agent accounts have higher limits. You can increase your limits by completing additional verification steps in your account settings.",
    },
    {
      id: "5",
      category: "payments",
      question: "Are there fees for using PayWallet?",
      answer:
        "PayWallet offers competitive pricing. Sending money to other PayWallet users is free. Cash-in and cash-out through agents have small fees (typically 1-2%). Bank transfers may have nominal fees depending on your bank. Check our pricing page for detailed fee information.",
    },
    {
      id: "6",
      category: "agents",
      question: "How do I become a PayWallet agent?",
      answer:
        "To become a PayWallet agent, register for an Agent account during signup or upgrade your existing account. You'll need to provide business documentation, complete identity verification, and pass our agent training program. Once approved, you can start offering cash-in/cash-out services and earn commissions.",
    },
    {
      id: "7",
      category: "agents",
      question: "How much can I earn as an agent?",
      answer:
        "Agent earnings depend on transaction volume and location. Agents typically earn 0.5-1.5% commission on each transaction. Active agents in busy locations can earn $500-2000+ per month. We provide marketing support and training to help maximize your earnings.",
    },
    {
      id: "8",
      category: "technical",
      question: "What should I do if I forgot my password?",
      answer:
        "If you forgot your password, click 'Forgot Password' on the login page. Enter your registered email address, and we'll send you a password reset link. Follow the instructions in the email to create a new password. For security, the reset link expires after 24 hours.",
    },
    {
      id: "9",
      category: "technical",
      question: "Why can't I log into my account?",
      answer:
        "Login issues can occur due to incorrect credentials, account suspension, or technical problems. First, ensure you're using the correct email and password. If you've forgotten your password, use the reset option. If problems persist, contact our 24/7 support team for assistance.",
    },
    {
      id: "10",
      category: "account",
      question: "How do I verify my account?",
      answer:
        "Account verification involves confirming your phone number, email address, and identity. Upload a clear photo of your government-issued ID and a selfie. Some features require additional verification like proof of address. Verification typically takes 1-2 business days.",
    },
    {
      id: "11",
      category: "payments",
      question: "Can I cancel a transaction?",
      answer:
        "Once a transaction is completed, it cannot be cancelled. However, you can request a refund from the recipient. For pending transactions (rare), contact support immediately. We recommend double-checking recipient details before confirming any transfer.",
    },
    {
      id: "12",
      category: "technical",
      question: "Is there a mobile app?",
      answer:
        "Yes! PayWallet is available as a mobile app for iOS and Android devices. The app offers all the features of our web platform with additional mobile-specific features like biometric login, push notifications, and offline transaction history viewing.",
    },
  ];

  const filteredFAQs = faqs.filter((faq) => {
    const matchesCategory =
      selectedCategory === "all" || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <HelmetTitle title="FAQ" />
      {/* <Navbar /> */}

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Find quick answers to common questions about PayWallet. Can't find
              what you're looking for? Contact our support team.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            {/* Search Bar */}
            <div className="relative mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search frequently asked questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-3 text-lg"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={
                    selectedCategory === category.id ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex items-center space-x-2"
                >
                  <category.icon className="h-4 w-4" />
                  <span>{category.label}</span>
                </Button>
              ))}
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-muted-foreground">
                Showing {filteredFAQs.length} of {faqs.length} questions
                {searchTerm && ` for "${searchTerm}"`}
              </p>
            </div>

            {/* FAQ Items */}
            <div className="space-y-4">
              {filteredFAQs.length > 0 ? (
                filteredFAQs.map((faq) => (
                  <Card key={faq.id} className="overflow-hidden">
                    <Collapsible
                      open={openItems.includes(faq.id)}
                      onOpenChange={() => toggleItem(faq.id)}
                    >
                      <CollapsibleTrigger asChild>
                        <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex items-start space-x-3 flex-1">
                              <Badge variant="outline" className="mt-1">
                                {
                                  categories
                                    .find((cat) => cat.id === faq.category)
                                    ?.label.split(" ")[0]
                                }
                              </Badge>
                              <CardTitle className="text-left text-lg font-medium">
                                {faq.question}
                              </CardTitle>
                            </div>
                            {openItems.includes(faq.id) ? (
                              <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                            )}
                          </div>
                        </CardHeader>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <CardContent className="pt-0">
                          <p className="text-muted-foreground leading-relaxed">
                            {faq.answer}
                          </p>
                        </CardContent>
                      </CollapsibleContent>
                    </Collapsible>
                  </Card>
                ))
              ) : (
                <Card className="p-12 text-center">
                  <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <CardTitle className="mb-2">No questions found</CardTitle>
                  <CardDescription className="mb-4">
                    We couldn't find any questions matching your search. Try
                    different keywords or browse all categories.
                  </CardDescription>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("all");
                    }}
                  >
                    Clear Filters
                  </Button>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Still Have Questions?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Our support team is available 24/7 to help you with any questions
              or concerns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8" asChild>
                <Link to="/contact">Contact Support</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 bg-transparent"
                asChild
              >
                <Link to="/auth/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
