import { SiteShell, PageHeading } from "@/components/site/SiteShell";

export default function PrivacyPage() {
  return (
    <SiteShell>
      <div className="ss-container py-10">
        <PageHeading>Privacy</PageHeading>
        <div className="ss-rte mx-auto max-w-[820px]">
          <p className="text-stone">Updated 23rd February 2023</p>

          <p>
            This Privacy Policy describes how your personal information is
            collected, used, and shared when you visit or make a purchase from
            sourdoughsophia.co.uk (the &quot;Site&quot;).
          </p>

          <h2>Personal information we collect</h2>
          <p>
            When you visit the Site, we automatically collect certain information
            about your device, including your web browser, IP address, time zone,
            and some of the cookies installed on your device. As you browse the
            Site, we collect information about the individual web pages that you
            view and how you interact with the Site. We refer to this as
            &quot;Device Information.&quot; We collect it using cookies, log
            files, and web beacons, tags and pixels. When you make a purchase we
            collect your name, billing and shipping address, payment details,
            email address and phone number — &quot;Order Information.&quot;
          </p>

          <h2>How do we use your personal information?</h2>
          <p>
            We use the Order Information to fulfil any orders (processing payment,
            arranging shipping, and providing order confirmations). We also use it
            to communicate with you, screen orders for potential risk or fraud,
            and provide you with information or advertising relating to our
            products or services. We use Device Information to help screen for
            potential risk and fraud, and to improve and optimise our Site.
          </p>

          <h2>Sharing your personal information</h2>
          <p>
            We share your personal information with third parties to help us use
            your Personal Information, as described above. For example, we use
            Shopify to power our online store and Google Analytics to help us
            understand how our customers use the Site.
          </p>

          <h2>Behavioural advertising</h2>
          <p>
            We use your Personal Information to provide you with targeted
            advertisements or marketing communications we believe may be of
            interest to you. You can opt out of targeted advertising via Facebook,
            Google, Bing and the Digital Advertising Alliance.
          </p>

          <h2>Do not track</h2>
          <p>
            Please note that we do not alter our Site&apos;s data collection and
            use practices when we see a Do Not Track signal from your browser.
          </p>

          <h2>Your rights</h2>
          <p>
            If you are a European resident, you have the right to access personal
            information we hold about you and to ask that your personal
            information be corrected, updated, or deleted.
          </p>

          <h2>Data retention</h2>
          <p>
            When you place an order through the Site, we will maintain your Order
            Information for our records unless and until you ask us to delete this
            information.
          </p>

          <h2>Minors</h2>
          <p>
            The Site is not intended for individuals under the age of 18.
          </p>

          <h2>Contact us</h2>
          <p>
            For more information about our privacy practices, or if you have
            questions, please contact us at{" "}
            <a className="text-rose" href="mailto:hello@sourdoughsophia.co.uk">
              hello@sourdoughsophia.co.uk
            </a>
            .
          </p>
        </div>
      </div>
    </SiteShell>
  );
}
