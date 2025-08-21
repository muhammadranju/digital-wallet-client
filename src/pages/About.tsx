import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Shield, Heart, Zap } from "lucide-react";
import { Link } from "react-router";

export default function About() {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      bio: "Former Goldman Sachs executive with 15+ years in fintech innovation.",
      image: "/professional-woman-ceo.png",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      bio: "Ex-Google engineer specializing in secure payment systems and blockchain technology.",
      image: "/professional-cto.png",
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Security",
      bio: "Cybersecurity expert with experience at major banks and payment processors.",
      image: "/professional-woman-security-expert.png",
    },
    {
      name: "David Kim",
      role: "Head of Product",
      bio: "Product strategist focused on user experience and financial inclusion.",
      image: "/professional-product-manager.png",
    },
  ];

  const values = [
    {
      icon: Shield,
      title: "Security First",
      description:
        "We prioritize the security of your funds and personal information above all else.",
    },
    {
      icon: Users,
      title: "Financial Inclusion",
      description:
        "Making digital payments accessible to everyone, regardless of their background.",
    },
    {
      icon: Heart,
      title: "Customer Centric",
      description:
        "Every decision we make is guided by what's best for our users.",
    },
    {
      icon: Zap,
      title: "Innovation",
      description:
        "Continuously pushing the boundaries of what's possible in digital finance.",
    },
  ];

  const milestones = [
    {
      year: "2020",
      event: "PayWallet founded with a vision to democratize digital payments",
    },
    { year: "2021", event: "Launched beta version with 1,000 early adopters" },
    {
      year: "2022",
      event: "Reached 1 million users and expanded agent network nationwide",
    },
    {
      year: "2023",
      event: "Processed $10 billion in transactions and achieved profitability",
    },
    {
      year: "2024",
      event: "Launched advanced features and reached 10 million active users",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* <Navbar /> */}

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Building the Future of Digital Payments
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              We're on a mission to make financial services accessible, secure,
              and simple for everyone. Join us in creating a world where money
              moves as easily as information.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                To empower individuals and businesses with secure, instant, and
                affordable digital payment solutions that bridge the gap between
                traditional banking and the digital economy.
              </p>
              <p className="text-lg text-muted-foreground">
                We believe that everyone deserves access to modern financial
                tools, regardless of their location, background, or economic
                status.
              </p>
            </div>
            <div className="relative">
              <img
                src="/digital-payment-mission.png"
                alt="Our Mission"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do at PayWallet.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center p-6 hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{value.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From a small startup to a trusted financial platform serving
              millions.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start mb-8 last:mb-0">
                <div className="flex-shrink-0 w-20 text-right mr-8">
                  <Badge variant="outline" className="text-sm font-semibold">
                    {milestone.year}
                  </Badge>
                </div>
                <div className="flex-shrink-0 w-4 h-4 bg-primary rounded-full mt-1 mr-8"></div>
                <div className="flex-1">
                  <p className="text-lg">{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The passionate individuals behind PayWallet's success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="text-center p-6 hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription className="text-primary font-medium">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              PayWallet by the Numbers
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                10M+
              </div>
              <div className="text-lg text-muted-foreground">Active Users</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                $50B+
              </div>
              <div className="text-lg text-muted-foreground">
                Transactions Processed
              </div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                50,000+
              </div>
              <div className="text-lg text-muted-foreground">
                Agent Partners
              </div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                99.9%
              </div>
              <div className="text-lg text-muted-foreground">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join Our Mission
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Be part of the financial revolution. Create your PayWallet account
              today.
            </p>
            <Button size="lg" className="text-lg px-8" asChild>
              <Link to="/auth/signup">Get Started Free</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
