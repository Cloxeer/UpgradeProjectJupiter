export function NewsletterSection() {
  return (
    <section className="mb-[30px] bg-cream px-[15px] py-[30px] text-center md:p-[30px]">
      <h2 className="mx-auto mb-[10px] mt-[20px] max-w-[700px] font-[family-name:var(--font-fraunces)] text-[32px] font-normal text-ink md:text-[40px]">
        We&apos;re expanding!
      </h2>
      <p className="mx-auto mt-[10px] max-w-[700px] font-[family-name:var(--font-fraunces)] text-[18px] leading-[26px] text-ink md:text-[20px] md:leading-[28px]">
        Sign up and be the first to know about new locations, new online courses
        and news about Sourdough Sophia! Don&apos;t worry, we don&apos;t spam and you
        only get an email once a week.
      </p>
      <form className="mx-auto mt-8 flex max-w-[540px] items-stretch justify-center">
        <input
          type="email"
          required
          placeholder="Email"
          aria-label="Email"
          className="min-w-0 flex-1 border-0 bg-white px-[15px] pb-[15px] pt-[16px] font-[family-name:var(--font-fraunces)] text-[16px] font-light text-ink outline-none"
        />
        <button type="submit" className="ss-btn-solid ml-[5px] shrink-0">
          Subscribe
        </button>
      </form>
    </section>
  );
}
