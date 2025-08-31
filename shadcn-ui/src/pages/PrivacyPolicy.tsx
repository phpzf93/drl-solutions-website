import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Privacy <span className="text-purple-400">Policy</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                We collect information you provide directly to us, such as when you:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Create an account or make a purchase</li>
                <li>Contact us through our website or email</li>
                <li>Subscribe to our newsletter or marketing communications</li>
                <li>Participate in surveys or promotions</li>
              </ul>
              <p>
                This information may include your name, email address, phone number, billing address, and payment information.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-2xl">How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Process transactions and deliver digital products</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Send important updates about your orders and account</li>
                <li>Improve our services and develop new features</li>
                <li>Send marketing communications (with your consent)</li>
                <li>Comply with legal obligations and protect our rights</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Information Sharing</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                We do not sell, trade, or otherwise transfer your personal information to third parties except:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>To trusted service providers who assist in operating our business</li>
                <li>When required by law or to protect our rights</li>
                <li>In connection with a business transfer or merger</li>
                <li>With your explicit consent</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Data Security</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Your Rights</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access and update your personal information</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Request a copy of your data</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                If you have questions about this Privacy Policy, please contact us at:
              </p>
              <div className="bg-white/5 p-4 rounded-lg">
                <p><strong>DRL Solutions</strong></p>
                <p>Den Russell Leonardo</p>
                <p>542 Lopez Jaena St., Brgy Bulilan Norte</p>
                <p>Pila, Laguna 4010, Philippines</p>
                <p>Email: admin@drl-softechs.dev</p>
                <p>Phone: +63 952 447 5356</p>
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