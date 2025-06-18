const quotes = [
  {
    id: 1,
    quote: "There is some god in this world, and it's worth fighing for.",
    author: "J.R.R. Tolkien",
    book: "The Two Towers",
  },
  {
    id: 2,
    quote: "Beware; for I am fearless, and therefore powerful.",
    author: "Mary Shelley",
    book: "Frankenstein",
  },
  {
    id: 3,
    quote:
      "I wanted you to see what real courage is, instead of getting the idea that courage is a man with a gun in his hand. It's when you know you're licked before you begin but you begin anyway and you see it through no matter what. You rarely win, but sometimes you do.",
    author: "Harper Lee",
    book: "To Kill a Mockingbird",
  },
  {
    id: 4,
    quote:
      "This above all: To thine own self be true, And it must follow, as the night the day, Thou canst not then be false to any man.",
    author: "William Shakespeare",
    book: "Hamlet",
  },
  {
    id: 5,
    quote:
      "Why did you do all this for me?' he asked. 'I don't deserve it. I've never done anything for you.' 'You have been my friend,' replied Charlotte. 'That in itself is a tremendous thing.",
    author: "E.B. White",
    book: "Charlotte's Web",
  },
  {
    id: 6,
    quote:
      "And so we beat on, boats against the current, borne back ceaselessly into the past.",
    author: "F. Scott Fitzgerald",
    book: "The Great Gatsby",
  },
  {
    id: 7,
    quote:
      "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    author: "Jane Austen",
    book: "Pride and Prejudice",
  },
  {
    id: 8,
    quote:
      "Why, sometimes, I've believed as many as six impossible things before breakfast.",
    author: "Lewis Carroll",
    book: "Through the Looking-Glass",
  },
  {
    id: 9,
    quote:
      "Don't ever tell anybody anything. If you do, you start missing everybody.",
    author: "J.D. Salinger",
    book: "The Catcher in the Rye",
  },
  {
    id: 10,
    quote: "It does not do to dwell on dreams and forget to live",
    author: "J.K. Rowling",
    book: "Harry Potter and the Sorcerer's Stone",
  },
  {
    id: 11,
    quote: "When you play the game of thrones you win or you die.",
    author: "George R.R. Martin",
    book: "A Game of Thrones",
  },
  {
    id: 12,
    quote:
      "“We were the people who were not in the papers. We lived in the blank white spaces at the edges of print. It gave us more freedom. We lived in the gaps between the stories.",
    author: "Margaret Atwood",
    book: "The Handmaid's Tale",
  },
  {
    id: 13,
    quote:
      "The creatures outside looked from pig to man, and from man to pig, and from pig to man again; but already it was impossible to say which was which.",
    author: "George Orwell",
    book: "Animal Farm",
  },
  {
    id: 14,
    quote: "To the stars who listen and the dreams that are answered.",
    author: "Sarah J. Maas",
    book: "A Court of Mist and Fury",
  },
  {
    id: 15,
    quote:
      "Libraries were full of ideas—perhaps the most dangerous and powerful of all weapons",
    author: "Sarah J. Maas",
    book: "Throne of Glass",
  },
  {
    id: 16,
    quote:
      "We all bear scars,... Mine just happen to be more visible than most.",
    author: "Sarah J. Maas",
    book: "Throne of Glass",
  },
  {
    id: 17,
    quote:
      "Some old wounds never truly heal, and bleed again at the slightest word",
    author: "George R.R. Martin",
    book: "A Game of Thrones",
  },
  {
    id: 18,
    quote:
      "People often claim to hunger for truth, but seldom like the taste when it's served up.",
    author: "George R.R. Martin",
    book: "A Clash of Kings",
  },
  {
    id: 19,
    quote:
      "be comfortable leaving the past behind. The past is supposed to inform your future, not dictate it.",
    author: "K.N. Banet",
    book: "Secrets and Ruin",
  },
  {
    id: 20,
    quote:
      "Fantasy allows people to explore topics that would make them uncomfortable in their own lives,",
    author: "K.N. Banet",
    book: "Rogue Alpha",
  },
  {
    id: 21,
    quote:
      "A dragon without its rider is a tragedy. A rider without their dragon is dead.",
    author: "Rebecca Yarros",
    book: "Fourth Wing",
  },
  {
    id: 22,
    quote:
      "Hope is a fickle, dangerous thing. It steals your focus and aims it toward the possibilities instead of keeping it where it belongs—on the probabilities.",
    author: "Rebecca Yarros",
    book: "Fourth Wing",
  },
  {
    id: 23,
    quote:
      "Because love, at its root, is hope. Hope for tomorrow. Hope for what could be. Hope that the someone you've entrusted your everything to will cradle and protect it. And hope? That shit is harder to kill than a dragon.",
    author: "Rebecca Yarros",
    book: "Iron Flame",
  },
  {
    id: 24,
    quote:
      "Some people are like Slinkies. They aren't really good for anything, but they still bring a smile to my face when I push them down a flight of stairs.",
    author: "Patricia Briggs",
    book: "Iron Kissed",
  },
  {
    id: 25,
    quote:
      "'Why is it that all cars are women?' he asked. 'Because they're fussy and demanding,' answered Zee. 'Because if they were men, they'd sit around and complain instead of getting the job done,' I told him.",
    author: "Patricia Briggs",
    book: "Silver Borne",
  },
  {
    id: 26,
    quote:
      "One of the oddest things about being grown-up was looking back at something you thought you knew and finding out the truth of it was completely different from what you had always believed.",
    author: "Patricia Briggs",
    book: "Bone Crossed",
  },
  {
    id: 27,
    quote:
      "Fear and bravery are often one and the same. It either makes you a warrior or a coward. The only difference is the person it resides inside.",
    author: "Jennifer L. Armentrout",
    book: "From Blood and Ash",
  },
  {
    id: 28,
    quote: "Let's make a deal that we don't borrow tomorrow's problems today.",
    author: "Jennifer L. Armentrout",
    book: "A Kingdom of Flesh and Fire",
  },
  {
    id: 29,
    quote: "Remembering. Forgetting. I'm not sure which is worse.",
    author: "Kelley Armstrong",
    book: "The Calling",
  },
  {
    id: 30,
    quote:
      "Only the very weak-minded refuse to be influenced by literature and poetry.",
    author: "Cassandra Clare",
    book: "Clockwork Angel",
  },
  {
    id: 31,
    quote: "Life is a book and there are a thousand pages I have not yet read.",
    author: "Cassandra Clare",
    book: "Clockwork Princess",
  },
  {
    id: 32,
    quote:
      "I don't do what I'm told, but I might do what you want if you ask me nicely",
    author: "Cassandra Clare",
    book: "City of Ashes",
  },
  {
    id: 33,
    quote: "Going outside is highly overrated",
    author: "Ernest Cline",
    book: "Ready Player One",
  },
  {
    id: 34,
    quote:
      "Whenever I saw the sun, I reminded myself that I was looking at a star. One of over a hundred billion in our galaxy. A galaxy that was just one of billions of other galaxies in the observable universe. This helped me keep things in perspective.",
    author: "Ernest Cline",
    book: "Ready Player One",
  },
  {
    id: 35,
    quote:
      "No one in the world ever gets what they want and that is beautiful.",
    author: "Ernest Cline",
    book: "Ready Player One",
  },
  {
    id: 36,
    quote: "You don't forget the face of the person who was your last hope.",
    author: "Suzanne Collins",
    book: "The Hunger Games",
  },
  {
    id: 37,
    quote:
      "It takes ten times as long to put yourself back together as it does to fall apart.",
    author: "Suzanne Collins",
    book: "Mockingjay",
  },
  {
    id: 38,
    quote: "You've got about as much charm as a dead slug.",
    author: "Suzanne Collins",
    book: "The Hunger Games",
  },
  {
    id: 39,
    quote:
      "I think there'odness built into human beings. You know when you've stepped across the line into evil, and it's your life's challenge to try and stay on the right side of that line.",
    author: "Suzanne Collins",
    book: "The Ballad of Songbirds and Snakes",
  },
  {
    id: 40,
    quote: "It's kind of hard to ask a dead guy what he did wrong.",
    author: "James Dashner",
    book: "The Maze Runner",
  },
  {
    id: 41,
    quote:
      "The betrayal meant he couldn't trust her anymore, and his heart told him he couldn't forgive her.",
    author: "James Dashner",
    book: "The Scorch Trials",
  },
  {
    id: 42,
    quote: "A piece of happiness should never be taken as due.",
    author: "Charlaine Harris",
    book: "Dead to the World",
  },
  {
    id: 43,
    quote:
      "Don't you just hate nights like that, when you think over every mistake you've made, every hurt you've received, every bit of meanness you've dealt out? There's no profit in it, no point to it, and you need sleep.",
    author: "Charlaine Harris",
    book: "Club Dead",
  },
  {
    id: 44,
    quote:
      "I must not fear. Fear is the mind-killer. Fear is the little-death that brings total obliteration. I will face my fear. I will permit it to pass over me and through me. And when it has gone past I will turn the inner eye to see its path. Where the fear has gone there will be nothing. Only I will remain.",
    author: "Frank Herbert",
    book: "Dune",
  },
  {
    id: 45,
    quote:
      "Deep in the human unconscious is a pervasive need for a logical universe that makes sense. But the real universe is always one step beyond logic.",
    author: "Frank Herbert",
    book: "Dune",
  },
  {
    id: 46,
    quote:
      "People who claim that they're evil are usually no worse than the rest of us... It's people who claim that they're good, or any way better than the rest of us, that you have to be wary of.",
    author: "Gregory Maquire",
    book: "Wicked:The Life and Times of the Wicked Witch of the West",
  },
  {
    id: 47,
    quote:
      "Where I'm from, we believe in all sorts of things that aren't true... we call it history.",
    author: "Gregory Maquire",
    book: "Wicked:The Life and Times of the Wicked Witch of the West",
  },
  {
    id: 48,
    quote:
      "The body apologizes to the soul for its errors, and the soul asks forgiveness for squatting in the body without invitation.",
    author: "Gregory Maquire",
    book: "Wicked:The Life and Times of the Wicked Witch of the West",
  },
  {
    id: 49,
    quote: "I like the night. Without the dark, we'd never see the stars.",
    author: "Stephenie Meyer",
    book: "Twilight",
  },
  {
    id: 50,
    quote:
      "I am Switzerland. I refuse to be affected by territorial disputes between mythical creatures.",
    author: "Stephenie Meyer",
    book: "Eclipse",
  },
  {
    id: 51,
    quote:
      "Books are my friends, my companions. They make me laugh and cry and find meaning in life.",
    author: "Christopher Paolini",
    book: "Eragon",
  },
  {
    id: 52,
    quote:
      "Keep in mind that many people have died for their beliefs; it's actually quite common. The real courage is in living and suffering for what you believe.",
    author: "Christopher Paolini",
    book: "Eragon",
  },
  {
    id: 53,
    quote: "If my life is going to mean anything, I have to live it myself.",
    author: "Rick Riordan",
    book: "The Lightning Thief",
  },
  {
    id: 54,
    quote: "Go on with what your heart tells you, or you will lose all.",
    author: "Rick Riordan",
    book: "The Lightning Thief",
  },
  {
    id: 55,
    quote: "Go on with what your heart tells you, or you will lose all.",
    author: "Veronica Roth",
    book: "Divergent",
  },
  {
    id: 56,
    quote:
      "Cruelty does not make a person dishonest, the same way bravery does not make a person kind.",
    author: "Veronica Roth",
    book: "Insurgent",
  },
  {
    id: 57,
    quote: "Sometimes, the best way to help someone is just to be near them.",
    author: "Veronica Roth",
    book: "Divergent",
  },
  {
    id: 58,
    quote: "Not all those who wander are lost.",
    author: "J.R.R. Tolkien",
    book: "The Fellowship of the Ring",
  },
  {
    id: 59,
    quote:
      "All we have to decide is what to do with the time that is given us.",
    author: "J.R.R. Tolkien",
    book: "The Fellowship of the Ring",
  },
  {
    id: 60,
    quote:
      "May it be a light to you in dark places, when all other lights go out.",
    author: "J.R.R. Tolkien",
    book: "The Fellowship of the Ring",
  },
  {
    id: 61,
    quote:
      "He's a bully. I love bullies. They have such big, shiny red buttons to push.",
    author: "Carrie Vaughn",
    book: "Kitty and the Silver Bullet",
  },
  {
    id: 62,
    quote: "This conspiracy needs a flow chart,",
    author: "Carrie Vaughn",
    book: "Kitty Steals the Show",
  },
];

export default quotes;
