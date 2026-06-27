export type WritingPost = {
  slug: string
  title: string
  date: string
  paragraphs: string[]
}

export const writingPosts: WritingPost[] = [
  {
    slug: "to-be-rare",
    title: "To be rare",
    date: "Jun 27, 2026",
    paragraphs: [
      `I think one of the most valuable choices you can make in life is to be rare.`,
      `There are 8 billion people on earth. Around 340 million live in the United States. 13 million of those are between the ages of 18 and 20. Of that age group, there's around 15,000 people who attend a school like Harvard, Stanford, Princeton, Yale, or MIT.`,
      `For myself, I could filter this further. What percentage of those students study computer science? What percent of those computer science majors dropped out to start a company? Maybe eventually, what percentage of those companies are successful?`,
      `I use this example because it represents my own form of rarity. I'm not the best looking. I'm not tall, the smartest, or a perfect guy. But statistically, in this set, I am rare. In a narrowed down set of college students, I am differentiated simply for making a couple personal choices in life.`,
      `Rarity comes in all forms. Some that can be changed, and some that cannot. You can do this same exercise for height, wealth, athleticism. You could do it for body fat percentage. For people who come from money, or people who are self-made. Any of these could be rarity.`,
      `Rarity is important because in a scarce society, people place increased value on things there are less of - so long as said thing is valued in the first place. Tall men are valued both because there are less of them and because it's more physically attractive. For women, you could say the same thing, but about different traits.`,
      `The one zero-sum thing about rarity is that it compounds. Having even a bit of rare opportunity allows one to do things that are even more statistically uncommon.`,
      `Michael Phelps is rare for winning 23 Olympic gold medals, the most of any Olympic athlete, ever. To put that into comparison, the person with the second most has 9. Phelps is also 6'4," trains 365 days a year, and started swimming when he was 7. Those rarities, along with effort, made him into someone far differentiated in Olympic sports.`,
      `Elon Musk is the richest man in the world. But he also started 6 successful companies and went to an Ivy League school. He used wealth from previous companies to start later ones. Most ventures were related to physics, which he studied. Currently he is worth 5x as much as the second wealthiest person.`,
      `I think if you pick something you are uniquely good at, and you go all the way, compounded differentiation can make a person extremely successful. If you're passionate about the thing, it can also make you extremely fulfilled.`,
      `It's important to realize that rarity is not about success or performance. A kind and loving person in a room of pretentious pricks would be the rarest person there. One of life's greatest gifts is that rarity, in a lot of cases, is a choice. Both in if one chooses to be rare, and also in what ways.`,
      `One can gain infinite upside simply from choosing to be different. At the end of the day, rarity is defined statistically. It's simply a willingness to do things that others are not.`,
      `The absolute worst choice one can make is staying ordinary. People don't remember background actors, but they remember Timothee Chalamet. They might not be able to name a small bookstore, but they certainly know Amazon.`,
      `I don't want to fade into the background. I want to be remembered. That's why I aspire to be rare.`,
    ],
  },
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
