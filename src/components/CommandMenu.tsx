"use client";

import * as React from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { RESUME_DATA } from "@/resume-data";
import { 
  Settings, 
  FileText,
  Home,
  Mail,
  Github,
  Linkedin,
  Terminal,
  Zap
} from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

export function CommandMenu() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  
  // Memoize social links to avoid repeated .find() calls
  const socialLinks = React.useMemo(() => ({
    github: RESUME_DATA.contact.social.find(s => s.name === "GitHub")?.url || "https://github.com",
    linkedin: RESUME_DATA.contact.social.find(s => s.name === "LinkedIn")?.url || "https://linkedin.com",
  }), []);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50 hidden md:block">
        <button 
          onClick={() => setOpen(true)}
          aria-label="Open command menu"
          aria-keyshortcuts="Control+K Meta+K"
          className="flex items-center gap-2 border-2 border-neo-black bg-white px-4 py-2 font-mono text-sm font-bold shadow-neo transition-transform hover:-translate-y-1 hover:shadow-neo-lg active:translate-y-0 active:shadow-none focus:outline-none focus:ring-2 focus:ring-neo-lime focus:ring-offset-2"
        >
          <Terminal className="h-4 w-4" aria-hidden="true" />
          <span>{typeof navigator !== 'undefined' && navigator.platform.includes('Mac') ? 'CMD+K' : 'CTRL+K'}</span>
        </button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="fixed inset-0 z-[99] flex items-start justify-center pt-[20vh]">
            <VisuallyHidden.Root>
                <DialogTitle>Command Menu</DialogTitle>
            </VisuallyHidden.Root>
          <div className="fixed inset-0 bg-neo-black/50 backdrop-blur-sm" onClick={() => setOpen(false)} />
          
          <Command className="relative w-full max-w-2xl overflow-hidden border-3 border-neo-black bg-white shadow-neo-lg [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-bold [&_[cmdk-group-heading]]:text-neo-dark-grey [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-16 [&_[cmdk-input]]:w-full [&_[cmdk-input]]:bg-transparent [&_[cmdk-input]]:px-4 [&_[cmdk-input]]:font-mono [&_[cmdk-input]]:text-lg [&_[cmdk-input]]:font-bold [&_[cmdk-input]]:placeholder:text-gray-400 [&_[cmdk-input]]:outline-none [&_[cmdk-item]]:mx-2 [&_[cmdk-item]]:flex [&_[cmdk-item]]:cursor-pointer [&_[cmdk-item]]:items-center [&_[cmdk-item]]:gap-3 [&_[cmdk-item]]:px-4 [&_[cmdk-item]]:py-3 [&_[cmdk-item]]:font-mono [&_[cmdk-item]]:font-bold [&_[cmdk-item]]:transition-colors [&_[cmdk-item][data-selected='true']]:bg-neo-lime [&_[cmdk-item][data-selected='true']]:text-neo-black [&_[cmdk-list]]:max-h-[300px] [&_[cmdk-list]]:overflow-y-auto [&_[cmdk-list]]:p-2">
            <div className="flex items-center border-b-3 border-neo-black px-4" cmdk-input-wrapper="">
              <Terminal className="mr-2 h-5 w-5" />
              <Command.Input placeholder="TYPE_COMMAND..." />
            </div>
            
            <Command.List>
              <Command.Empty className="py-6 text-center font-mono font-bold">NO_RESULTS_FOUND.</Command.Empty>

              <Command.Group heading="NAVIGATION">
                <Command.Item onSelect={() => runCommand(() => router.push("/"))}>
                  <Home className="h-4 w-4" />
                  GO_TO_HOME
                </Command.Item>
                <Command.Item onSelect={() => runCommand(() => router.push("/resume"))}>
                  <FileText className="h-4 w-4" />
                  VIEW_RESUME
                </Command.Item>
              </Command.Group>

              <Command.Group heading="ACTIONS">
                <Command.Item onSelect={() => runCommand(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }))}>
                  <Mail className="h-4 w-4" />
                  SEND_EMAIL
                </Command.Item>
                <Command.Item onSelect={() => runCommand(() => window.print())}>
                  <Settings className="h-4 w-4" />
                  PRINT_PAGE
                </Command.Item>
              </Command.Group>

              <Command.Group heading="SOCIALS">
                <Command.Item onSelect={() => runCommand(() => window.open(socialLinks.github, "_blank"))}>
                  <Github className="h-4 w-4" />
                  GITHUB
                </Command.Item>
                <Command.Item onSelect={() => runCommand(() => window.open(socialLinks.linkedin, "_blank"))}>
                  <Linkedin className="h-4 w-4" />
                  LINKEDIN
                </Command.Item>
              </Command.Group>

              <Command.Group heading="SYSTEM">
                <Command.Item onSelect={() => runCommand(() => window.dispatchEvent(new CustomEvent("toggle-chaos")))}>
                  <Zap className="h-4 w-4 text-yellow-500" />
                  BUILDER_MODE
                </Command.Item>
              </Command.Group>
            </Command.List>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
}

