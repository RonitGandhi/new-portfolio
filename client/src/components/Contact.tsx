import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Using Formspree endpoint from the original HTML
    const formData = new FormData();
    formData.append("fullname", name);
    formData.append("email", email);
    formData.append("message", message);

    try {
      const response = await fetch("https://formspree.io/f/xqaawdwg", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        toast({
          title: "Message sent!",
          description: "Thanks for reaching out. I'll get back to you soon.",
        });
        setName("");
        setEmail("");
        setMessage("");
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-32">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-16">
          <div className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase mb-4">
            // contact
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: "Fraunces, var(--font-serif)" }}
          >
            Get In Touch
          </h2>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          <Card className="md:col-span-3 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about your project..."
                  rows={5}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Card>

          <div className="md:col-span-2 space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Connect With Me</h3>
              <div className="space-y-3">
                <a 
                  href="https://github.com/RonitGandhi" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg hover-elevate transition-all"
                >
                  <Github className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm">GitHub</span>
                </a>
                
                <a 
                  href="https://www.linkedin.com/in/ronit-gandhi-5a65941aa/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg hover-elevate transition-all"
                >
                  <Linkedin className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm">LinkedIn</span>
                </a>
                
                <a 
                  href="mailto:ronitgandhi1610@gmail.com"
                  className="flex items-center gap-3 p-3 rounded-lg hover-elevate transition-all"
                >
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm">ronitgandhi1610@gmail.com</span>
                </a>

                <div className="flex items-center gap-3 p-3">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm">New Brunswick, New Jersey, USA</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-primary/5 border-primary/20">
              <h3 className="font-semibold text-lg mb-2">Open to Conversations</h3>
              <p className="text-sm text-muted-foreground">
                Always happy to talk about interesting backend, infra, or AI engineering problems — full-time, consulting, or just a good conversation.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

