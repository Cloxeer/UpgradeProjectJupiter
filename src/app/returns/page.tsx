import { SiteShell, PageHeading } from "@/components/site/SiteShell";

export default function ReturnsPage() {
  return (
    <SiteShell>
      <div className="ss-container py-10">
        <PageHeading>Returns</PageHeading>
        <div className="ss-rte mx-auto max-w-[820px]">
          <p className="text-stone">Updated 23rd February 2023</p>

          <h2>Perishable/Fresh Items</h2>
          <p>
            During the COVID-19 crisis and for health and safety reasons, the
            return of perishable items is not permissible under any circumstances.
          </p>

          <h2>Beverages</h2>
          <p>
            If you don&apos;t like any beverages that you buy from us, for
            whatever reason, you may return any unopened bottles within a month of
            purchase and we shall refund your money without question or delay.
            This applies to United Kingdom customers only. Our policy lasts 30
            days. If 30 days have gone by since your purchase, unfortunately we
            can&apos;t offer you a refund or exchange.
          </p>
          <p>
            To be eligible for a return, your item must be unused and in the same
            condition that you received it. To complete your return, we require a
            receipt or proof of purchase.
          </p>
          <p>
            There are certain situations where only partial refunds are granted
            (if applicable):
          </p>
          <ul>
            <li>
              Any item not in its original condition, is damaged or missing parts
              for reasons not due to our error
            </li>
            <li>Any item that is returned more than 30 days after delivery</li>
          </ul>

          <h2>Refunds</h2>
          <p>
            Refunds, returns or exchanges are not permissible if you have changed
            your mind. Once your approved return is received and inspected, we
            will send you an email to notify you that we have received your
            returned item and to advise the next steps. We will also notify you of
            the approval or rejection of your refund or exchange.
          </p>
          <p>
            In the case of a refund, if your return is approved, your refund will
            be processed, and a credit for the purchase price of the specific item
            will automatically be applied to your credit card or original method
            of payment, within 30 days.
          </p>
          <p>
            In the case of an exchange, if your return is approved, your exchange
            will be processed and we will attempt to deliver your exchange items
            within 14 days.
          </p>

          <h2>Late or Missing Refunds (if applicable)</h2>
          <p>
            If you haven&apos;t received an approved refund within 30 days, first
            check your bank account again. Then contact your credit card company,
            it may take some time before your refund is officially posted. Next
            contact your bank. There is often some processing time before a refund
            is posted. If you&apos;ve done all of this and you still have not
            received your refund yet, please contact us.
          </p>

          <h2>Gifts (if applicable)</h2>
          <p>
            If the item you received was sent to you as a gift from a third party,
            all conditions relating to returns, refunds and exchanges as detailed
            above apply.
          </p>

          <h2>Claims (if applicable)</h2>
          <p>
            Any breakage, theft or short/partial delivery must be notified
            immediately and the delivery note amended accordingly. We cannot
            accept claims for any losses if the delivery note is signed
            &apos;unexamined&apos;.
          </p>

          <h2>Shipping</h2>
          <p>
            To return your product, you should contact us for the return address.
            You will be responsible for paying for your own shipping costs for
            returning your item. Shipping costs are non-refundable. If you receive
            a refund, the cost of return shipping will be deducted from your
            refund. Depending on where you live, the time it may take for your
            exchanged product to reach you may vary. If you are shipping an item
            over £50, you should consider using a trackable shipping service or
            purchasing shipping insurance. We don&apos;t guarantee that we will
            receive your returned item.
          </p>
        </div>
      </div>
    </SiteShell>
  );
}
