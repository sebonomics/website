export type WritingPost = {
  slug: string
  title: string
  date: string
  paragraphs: string[]
}

export const writingPosts: WritingPost[] = [
  {
    slug: "competition-is-for-winners",
    title: "Competition is for Winners",
    date: "May 29, 2026",
    paragraphs: [
      `There's a very famous speech from Peter Thiel called "Competition is for Losers," where he argues that in order to make a generational company, you must create a monopoly. You must attack a niche market. And you should not fight off competitors in zero-sum markets. I don't fully agree with this.`,
      `In my opinion, the best products are ones that everyone can use. It sounds obvious, but most founders talk themselves out of it — "we need to pick a niche," "you can't be everything to everyone," "narrow the ICP." Sometimes that's right. But sometimes the market is just big enough that everyone actually is your customer.`,
      `One amazing example of this between 2018 and now is startup banking. A half dozen companies like Brex, Ramp, Slash, Rho, and Mercury are all chasing the same customer, offering roughly the same thing: a billboard in SoMa, a deposit bonus, cash back, and a friendly rep who will take you out to dinner (thx Jayson). Conventional wisdom says that's a crowded market. But all five are growing. All five are unicorns. And all five seem to be winning.`,
      `The reason is simple: when your potential customer is literally every company that gets started, the market doesn't really have a ceiling. You don't have to steal from a competitor — you just have to be there when the next batch of startups opens their doors. The incumbents were so bad for so long that even a halfway decent product felt like a revelation, and there was plenty of market to go around.`,
      `That's the thing about horizontal products done right. The competition looks scarier than it is, because everyone's focused on the wrong number. Market share doesn't matter much when the market itself is still expanding. Multiple winners isn't a sign that a space is overcrowded — sometimes it's just a sign that the space is real.`,
      `I think competition is for winners. I love a fight. And I think over the next decade, there will be many more verticals in software similar to startup banking. A better way to frame this is that oligopolistic competition is for winners. PayPal — Thiel's own creation — has an oligopolistic market makeup too. Stripe, Square, and Adyen are all players. But that doesn't mean everyone can't win.`,
      `We're already seeing this in sales and compliance software.`,
    ],
  },
]

export function getWritingPost(slug: string): WritingPost | undefined {
  return writingPosts.find((post) => post.slug === slug)
}

export function writingPostHref(slug: string): string {
  return `/writing/${slug}`
}
