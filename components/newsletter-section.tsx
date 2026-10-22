/*
 * OLD DB-BASED NEWSLETTER SECTION (commented out — replaced by MailerLite)
 *
 * "use client"
 *
 * import type React from "react"
 * import { useState } from "react"
 * import { Button } from "@/components/ui/button"
 * import { Input } from "@/components/ui/input"
 * import { Mail } from "lucide-react"
 *
 * export function NewsletterSection() {
 *   const [email, setEmail] = useState("")
 *   const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
 *   const [message, setMessage] = useState("")
 *
 *   const handleSubmit = async (e: React.FormEvent) => {
 *     e.preventDefault()
 *     setStatus('submitting')
 *     try {
 *       const res = await fetch('/api/subscribe', {
 *         method: 'POST',
 *         headers: { 'Content-Type': 'application/json' },
 *         body: JSON.stringify({ email, source: 'newsletter' }),
 *       })
 *       const data = await res.json()
 *       if (data.success) {
 *         setStatus('success')
 *         setMessage(data.message)
 *         setEmail("")
 *       } else {
 *         setStatus('error')
 *         setMessage(data.message)
 *       }
 *     } catch {
 *       setStatus('error')
 *       setMessage('Something went wrong. Please try again.')
 *     }
 *   }
 *
 *   return (
 *     <section id="newsletter" className="py-20 md:py-28 bg-primary/5">
 *       <div className="container mx-auto px-4">
 *         <div className="max-w-2xl mx-auto text-center">
 *           <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
 *             <Mail className="h-7 w-7 text-primary" />
 *           </div>
 *           <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Stay Updated</h2>
 *           <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6"></div>
 *           <p className="text-lg text-muted-foreground mb-8">
 *             Sign up for updates on tickets, speakers, and event news!
 *           </p>
 *           {status === 'success' ? (
 *             <div className="bg-primary/10 text-primary rounded-lg p-4">
 *               <p className="font-medium">{message}</p>
 *               <p className="text-sm mt-1">{"We'll keep you updated on all things Innovate QA."}</p>
 *             </div>
 *           ) : (
 *             <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md mx-auto">
 *               <div className="flex flex-col sm:flex-row gap-3">
 *                 <Input
 *                   type="email"
 *                   placeholder="Enter your email"
 *                   value={email}
 *                   onChange={(e) => setEmail(e.target.value)}
 *                   required
 *                   className="flex-1"
 *                 />
 *                 <Button type="submit" disabled={status === 'submitting'}>
 *                   {status === 'submitting' ? 'Subscribing...' : 'Subscribe'}
 *                 </Button>
 *               </div>
 *               {status === 'error' && (
 *                 <p className="text-sm text-red-500 text-left">{message}</p>
 *               )}
 *             </form>
 *           )}
 *         </div>
 *       </div>
 *     </section>
 *   )
 * }
 */

import { Mail } from "lucide-react"

export function NewsletterSection() {
  return (
    <section id="newsletter" className="scroll-mt-24 py-20 md:py-28 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Mail className="h-7 w-7 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Stay Updated</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-muted-foreground mb-8">
            Sign up for updates on tickets, speakers, and event news!
          </p>
          <div className="ml-embedded" data-form="DAOAEv"></div>
          <p className="mt-5 text-sm text-muted-foreground">
            Form not loading?{" "}
            <a className="font-medium text-primary underline underline-offset-4" href="mailto:contact@innovateqaevents.com?subject=Subscribe%20to%20Innovate%20QA%20Updates">
              Email us to subscribe
            </a>.
          </p>
        </div>
      </div>
    </section>
  )
}
