import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Refund & Return <span className="text-purple-400">Policy</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our commitment to customer satisfaction and transparent refund policies for digital products.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Digital Products Policy</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                Due to the nature of digital products, all sales are generally final. However, we understand that issues may arise, and we're committed to working with our customers to resolve them.
              </p>
              <p>
                <strong>Important:</strong> Digital products cannot be "returned" in the traditional sense since they are delivered electronically and cannot be physically retrieved once downloaded or accessed.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Refund Eligibility</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>We may consider refunds in the following circumstances:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Technical Issues:</strong> If the digital product is corrupted, incomplete, or doesn't function as described</li>
                <li><strong>Duplicate Purchase:</strong> If you accidentally purchased the same item multiple times</li>
                <li><strong>Unauthorized Purchase:</strong> If your account was compromised and unauthorized purchases were made</li>
                <li><strong>Significant Misrepresentation:</strong> If the product significantly differs from its description</li>
                <li><strong>Non-Delivery:</strong> If you didn't receive the digital product within 24 hours of purchase</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Refund Process</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>To request a refund, please follow these steps:</p>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>Contact us within <strong>7 days</strong> of your purchase</li>
                <li>Provide your order number and detailed explanation of the issue</li>
                <li>Include any relevant screenshots or documentation</li>
                <li>Allow us 48-72 hours to investigate your request</li>
              </ol>
              <p>
                We will first attempt to resolve any technical issues or provide alternative solutions before processing a refund.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Refund Timeline</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Request Review:</strong> 2-3 business days</li>
                <li><strong>Refund Processing:</strong> 3-5 business days after approval</li>
                <li><strong>Bank/Card Processing:</strong> 5-10 business days (varies by financial institution)</li>
              </ul>
              <p>
                Refunds will be processed using the same payment method used for the original purchase.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Non-Refundable Items</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>The following items are not eligible for refunds:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Custom development work that has been started or completed</li>
                <li>Digital products that have been successfully downloaded and used</li>
                <li>Services that have been fully rendered</li>
                <li>Products purchased more than 7 days ago (unless exceptional circumstances)</li>
                <li>Products that were clearly described as "no refund" at the time of purchase</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Exchanges and Store Credit</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                In some cases, we may offer exchanges or store credit as an alternative to refunds:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Exchange for a different product of equal or lesser value</li>
                <li>Store credit for future purchases</li>
                <li>Upgrade to a premium version (with additional payment if required)</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Dispute Resolution</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                If you're not satisfied with our refund decision, you may:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Request escalation to our management team</li>
                <li>Provide additional documentation to support your case</li>
                <li>Contact your payment provider if you believe the charge was unauthorized</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                For refund requests or questions about this policy, please contact us:
              </p>
              <div className="bg-white/5 p-4 rounded-lg">
                <p><strong>DRL Solutions</strong></p>
                <p>Den Russell Leonardo</p>
                <p>542 Lopez Jaena St., Brgy Bulilan Norte</p>
                <p>Pila, Laguna 4010, Philippines</p>
                <p>Email: admin@drl-softechs.dev</p>
                <p>Phone: +63 952 447 5356</p>
                <p>Messaging: Viber, WhatsApp, Telegram (09524475356)</p>
              </div>
              <p className="text-sm text-gray-400">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}