import { Metadata } from 'next';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cookie Policy | Ooru Chutneypudi',
  description: 'Cookie Policy for Ooru Chutneypudi - Learn about how we use cookies and similar technologies on our website.',
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/30 via-white to-amber-50/30 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex flex-col items-center space-y-4 mb-6">
            <Link 
              href="/"
              className="inline-flex items-center text-orange-600 hover:text-orange-700 transition-colors"
            >
              ← Back to Home
            </Link>
            <Link 
              href="/cart" 
              className="p-2 bg-orange-100 rounded-full hover:bg-orange-200 transition-colors"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-6 h-6 text-orange-600" />
            </Link>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Cookie Policy
          </h1>
          <p className="text-gray-600 text-lg">
            Last updated: January 30, 2025
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-8">
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. What Are Cookies</h2>
            <p className="text-gray-700 leading-relaxed">
              Cookies are small text files that are stored on your computer or mobile device when you visit a website. 
              They are widely used to make websites work more efficiently and provide information to the website owners.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Cookies</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Ooru Chutneypudi uses cookies for the following purposes:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
              <li><strong>Functionality Cookies:</strong> Remember your preferences and settings</li>
              <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
              <li><strong>Performance Cookies:</strong> Analyze website performance and user experience</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Types of Cookies We Use</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">3.1 Strictly Necessary Cookies</h3>
                <p className="text-gray-700 leading-relaxed mb-2">
                  These cookies are essential for the website to function properly. They enable you to navigate our site and use its features.
                </p>
                <div className="bg-orange-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700"><strong>Examples:</strong> Session cookies, authentication cookies, security cookies</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">3.2 Performance and Analytics Cookies</h3>
                <p className="text-gray-700 leading-relaxed mb-2">
                  These cookies collect information about how you use our website, such as which pages you visit most often.
                </p>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700"><strong>Examples:</strong> Google Analytics, page load times, error tracking</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">3.3 Functionality Cookies</h3>
                <p className="text-gray-700 leading-relaxed mb-2">
                  These cookies allow the website to remember choices you make and provide enhanced, more personal features.
                </p>
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700"><strong>Examples:</strong> Language preferences, region selection, shopping cart contents</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">3.4 Marketing and Advertising Cookies</h3>
                <p className="text-gray-700 leading-relaxed mb-2">
                  These cookies track your browsing habits to enable us to show targeted advertisements.
                </p>
                <div className="bg-purple-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700"><strong>Examples:</strong> Facebook Pixel, Google Ads, retargeting cookies</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Third-Party Cookies</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Some cookies are placed by third-party services that appear on our pages. We use the following third-party services:
            </p>
            <div className="space-y-4">
              <div className="border-l-4 border-orange-500 pl-4">
                <h4 className="font-semibold text-gray-800">Google Analytics</h4>
                <p className="text-sm text-gray-600">Helps us understand website traffic and user behavior</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-gray-800">Facebook Pixel</h4>
                <p className="text-sm text-gray-600">Enables us to measure advertising effectiveness</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-gray-800">Payment Processors</h4>
                <p className="text-sm text-gray-600">Secure payment processing cookies</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Managing Cookies</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">5.1 Browser Settings</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  You can control and manage cookies in various ways. Please bear in mind that removing or blocking cookies can impact your user experience.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Chrome</h4>
                    <p className="text-sm text-gray-600">Navigate to Settings, then Privacy and Security, then Cookies and other site data</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Firefox</h4>
                    <p className="text-sm text-gray-600">Go to Options, then Privacy & Security, then Cookies and Site Data</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Safari</h4>
                    <p className="text-sm text-gray-600">Open Preferences, then Privacy, then Manage Website Data</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Edge</h4>
                    <p className="text-sm text-gray-600">Access Settings, then Cookies and site permissions, then Cookies and site data</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">5.2 Opting Out</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>You can opt out of Google Analytics cookies by visiting <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-orange-700">Google Analytics Opt-out Browser Add-on</a></li>
                  <li>You can opt out of Facebook Pixel by visiting <a href="https://www.facebook.com/settings?tab=ads" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-orange-700">Facebook Ad Preferences</a></li>
                  <li>You can manage marketing preferences in your account settings</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Local Storage</h2>
            <p className="text-gray-700 leading-relaxed">
              We also use local storage (similar to cookies) to store information on your device. This helps us remember your preferences and improve your shopping experience. You can manage local storage through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cookie Consent</h2>
            <p className="text-gray-700 leading-relaxed">
              By continuing to use our website, you consent to our use of cookies as described in this Cookie Policy. You can change your cookie preferences at any time through your browser settings or by contacting us directly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Updates to This Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact Us</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-700 mb-4">If you have any questions about our Cookie Policy, please contact us:</p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Email:</strong> privacy@ooruchutneypudi.com</p>
                <p><strong>Phone:</strong> +91 98765 43210</p>
                <p><strong>Address:</strong> 123 Spice Street, Flavor Town, India</p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
