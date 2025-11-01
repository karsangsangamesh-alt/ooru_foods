import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service | Ooru Chutneypudi',
  description: 'Terms of Service for Ooru Chutneypudi - Read our terms and conditions for using our website and services.',
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/30 via-white to-amber-50/30 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Link 
            href="/"
            className="inline-block text-orange-600 hover:text-orange-700 mb-6 transition-colors"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-600 text-lg">
            Last updated: January 30, 2025
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-8">
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing and using the Ooru Chutneypudi website ("Service"), you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Use License</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Permission is granted to temporarily download one copy of the materials on Ooru Chutneypudi's website for personal, non-commercial transitory viewing only.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>modify or copy the materials</li>
              <li>use the materials for any commercial purpose or for any public display</li>
              <li>attempt to decompile or reverse engineer any software contained on the website</li>
              <li>remove any copyright or other proprietary notations from the materials</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Product Information and Pricing</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We strive to provide accurate product information, including descriptions, images, and pricing. However, we do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free.
            </p>
            <p className="text-gray-700 leading-relaxed">
              All prices are subject to change without notice. We reserve the right to modify or discontinue products at any time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Orders and Payment</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Order Acceptance</h3>
                <p className="text-gray-700 leading-relaxed">
                  Your receipt of an order confirmation does not signify our acceptance of your order. We reserve the right to cancel any order for any reason at any time after receipt of your order.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Payment Terms</h3>
                <p className="text-gray-700 leading-relaxed">
                  Payment is due at the time of order. We accept various payment methods as displayed on our website. All payments are processed securely through third-party payment processors.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Shipping and Delivery</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We will make every effort to ship orders promptly. Delivery times are estimates and may vary based on location and other factors.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Risk of loss passes to you upon delivery of the products to the shipping address. You are responsible for filing claims with the carrier for lost or damaged shipments.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Returns and Refunds</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Due to the nature of food products, most items cannot be returned. However, if you receive a damaged or defective product, please contact us within 24 hours of delivery.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to require proof of damage or defect before processing any returns or refunds.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Disclaimer</h2>
            <p className="text-gray-700 leading-relaxed">
              The materials on Ooru Chutneypudi's website are provided on an 'as is' basis. Ooru Chutneypudi makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Limitations</h2>
            <p className="text-gray-700 leading-relaxed">
              In no event shall Ooru Chutneypudi or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Ooru Chutneypudi's website, even if Ooru Chutneypudi or a Ooru Chutneypudi authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. User Accounts</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              When you create an account with us, you must provide accurate and complete information. You are responsible for safeguarding the password and for all activities that occur under your account.
            </p>
            <p className="text-gray-700 leading-relaxed">
              You agree to notify us immediately of any unauthorized use of your account or any other security breach.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Prohibited Uses</h2>
            <p className="text-gray-700 leading-relaxed mb-4">You may not use our website:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
              <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
              <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
              <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
              <li>To submit false or misleading information</li>
              <li>To upload or transmit viruses or any other type of malicious code</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to modify or replace these Terms at any time. It is your responsibility to review these Terms periodically for changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Information</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-700 mb-4">If you have any questions about these Terms of Service, please contact us:</p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Email:</strong> legal@ooruchutneypudi.com</p>
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
