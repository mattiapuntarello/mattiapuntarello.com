import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Phone, MapPin, Linkedin, Github, Twitter, Instagram, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertContactMessageSchema } from "@shared/schema";
import { useLanguage } from "@/context/language-context";


type ContactFormData = z.infer<typeof insertContactMessageSchema>;

export default function ContactSection() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: (data: ContactFormData) => apiRequest("POST", "/api/contact", data),
    onSuccess: () => {
      toast({
        title: t("contact", "toast.success"),
        description: t("contact", "toast.successDesc"),
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: t("contact", "toast.error"),
        description: error.message || t("contact", "toast.errorDesc"),
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-16 lg:py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary mb-4">{t("contact", "title")}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t("contact", "description")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold text-secondary mb-6">{t("contact", "getInTouch")}</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Mail className="text-primary w-6 h-6" />
                </div>
                <div>
                  <p className="font-medium text-secondary">{t("contact", "email")}</p>
                  <a 
                    href="mailto:mattia.puntarello@email.com" 
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    mattia.puntarello@email.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Phone className="text-primary w-6 h-6" />
                </div>
                <div>
                  <p className="font-medium text-secondary">{t("contact", "phone")}</p>
                  <a 
                    href="tel:+393123456789" 
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    +39 312 345 6789
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <MapPin className="text-primary w-6 h-6" />
                </div>
                <div>
                  <p className="font-medium text-secondary">{t("contact", "location")}</p>
                  <p className="text-gray-600">Milano, Italia</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-lg font-semibold text-secondary mb-4">{t("contact", "followSocial")}</h4>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="bg-primary/10 p-3 rounded-lg hover:bg-primary hover:text-white transition-all duration-200 text-primary"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="bg-primary/10 p-3 rounded-lg hover:bg-primary hover:text-white transition-all duration-200 text-primary"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="bg-primary/10 p-3 rounded-lg hover:bg-primary hover:text-white transition-all duration-200 text-primary"
                >
                  <Twitter className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="bg-primary/10 p-3 rounded-lg hover:bg-primary hover:text-white transition-all duration-200 text-primary"
                >
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-secondary">{t("contact", "form.name")}</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder={t("contact", "form.namePlaceholder")}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-secondary">{t("contact", "form.email")}</FormLabel>
                      <FormControl>
                        <Input 
                          type="email"
                          placeholder={t("contact", "form.emailPlaceholder")}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-secondary">{t("contact", "form.subject")}</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder={t("contact", "form.subjectPlaceholder")} 
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-secondary">{t("contact", "form.message")}</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder={t("contact", "form.messagePlaceholder")}
                          rows={4}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  disabled={contactMutation.isPending}
                  className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {contactMutation.isPending ? (
                    <span className="inline-flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {t("contact", "form.sending")}
                    </span>
                  ) : (
                    <span className="inline-flex items-center">
                      <Send className="w-5 h-5 mr-2" />
                      {t("contact", "form.send")}
                    </span>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
