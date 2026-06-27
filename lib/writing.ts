export type WritingPost = {
  slug: string
  title: string
  date: string
  paragraphs: string[]
}

export const writingPosts: WritingPost[] = [
  {
    slug: "to-be-rare",
    title: "Rarity",
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
]

export function getWritingPost(slug: string): WritingPost | undefined {
  return writingPosts.find((post) => post.slug === slug)
}

export function writingPostHref(slug: string): string {
  return `/writing/${slug}`
}
