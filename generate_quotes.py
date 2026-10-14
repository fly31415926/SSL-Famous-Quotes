import json

quotes = [
    # Philosophy (1-18)
    {
        "id": 1,
        "quote": "The only true wisdom is in knowing you know nothing.",
        "author": "Socrates",
        "category": "Philosophy"
    },
    {
        "id": 2,
        "quote": "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
        "author": "Aristotle",
        "category": "Philosophy"
    },
    {
        "id": 3,
        "quote": "He who has a why to live can bear almost any how.",
        "author": "Friedrich Nietzsche",
        "category": "Philosophy"
    },
    {
        "id": 4,
        "quote": "You have power over your mind - not outside events. Realize this, and you will find strength.",
        "author": "Marcus Aurelius",
        "category": "Philosophy"
    },
    {
        "id": 5,
        "quote": "I think, therefore I am.",
        "author": "René Descartes",
        "category": "Philosophy"
    },
    {
        "id": 6,
        "quote": "It does not matter how slowly you go as long as you do not stop.",
        "author": "Confucius",
        "category": "Philosophy"
    },
    {
        "id": 7,
        "quote": "A journey of a thousand miles begins with a single step.",
        "author": "Lao Tzu",
        "category": "Philosophy"
    },
    {
        "id": 8,
        "quote": "Happiness is not an ideal of reason, but of imagination.",
        "author": "Immanuel Kant",
        "category": "Philosophy"
    },
    {
        "id": 9,
        "quote": "Man is condemned to be free; because once thrown into the world, he is responsible for everything he does.",
        "author": "Jean-Paul Sartre",
        "category": "Philosophy"
    },
    {
        "id": 10,
        "quote": "In the depth of winter, I finally learned that within me there lay an invincible summer.",
        "author": "Albert Camus",
        "category": "Philosophy"
    },
    {
        "id": 11,
        "quote": "Peace is not the absence of war, it is a virtue, a state of mind, a disposition for benevolence, confidence, justice.",
        "author": "Baruch Spinoza",
        "category": "Philosophy"
    },
    {
        "id": 12,
        "quote": "Talent hits a target no one else can hit; Genius hits a target no one else can see.",
        "author": "Arthur Schopenhauer",
        "category": "Philosophy"
    },
    {
        "id": 13,
        "quote": "Wealth consists not in having great possessions, but in having few wants.",
        "author": "Epictetus",
        "category": "Philosophy"
    },
    {
        "id": 14,
        "quote": "Luck is what happens when preparation meets opportunity.",
        "author": "Seneca",
        "category": "Philosophy"
    },
    {
        "id": 15,
        "quote": "The unexamined life is not worth living.",
        "author": "Socrates",
        "category": "Philosophy"
    },
    {
        "id": 16,
        "quote": "Knowing yourself is the beginning of all wisdom.",
        "author": "Aristotle",
        "category": "Philosophy"
    },
    {
        "id": 17,
        "quote": "The measure of a man is what he does with power.",
        "author": "Plato",
        "category": "Philosophy"
    },
    {
        "id": 18,
        "quote": "To live is to suffer, to survive is to find some meaning in the suffering.",
        "author": "Friedrich Nietzsche",
        "category": "Philosophy"
    },

    # Science & Tech (19-36)
    {
        "id": 19,
        "quote": "Imagination is more important than knowledge. For knowledge is limited, whereas imagination embraces the entire world.",
        "author": "Albert Einstein",
        "category": "Science & Tech"
    },
    {
        "id": 20,
        "quote": "If I have seen further it is by standing on the shoulders of Giants.",
        "author": "Isaac Newton",
        "category": "Science & Tech"
    },
    {
        "id": 21,
        "quote": "Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less.",
        "author": "Marie Curie",
        "category": "Science & Tech"
    },
    {
        "id": 22,
        "quote": "The present is theirs; the future, for which I really worked, is mine.",
        "author": "Nikola Tesla",
        "category": "Science & Tech"
    },
    {
        "id": 23,
        "quote": "And yet it moves.",
        "author": "Galileo Galilei",
        "category": "Science & Tech"
    },
    {
        "id": 24,
        "quote": "The first principle is that you must not fool yourself and you are the easiest person to fool.",
        "author": "Richard Feynman",
        "category": "Science & Tech"
    },
    {
        "id": 25,
        "quote": "Intelligence is the ability to adapt to change.",
        "author": "Stephen Hawking",
        "category": "Science & Tech"
    },
    {
        "id": 26,
        "quote": "Somewhere, something incredible is waiting to be known.",
        "author": "Carl Sagan",
        "category": "Science & Tech"
    },
    {
        "id": 27,
        "quote": "Sometimes it is the people no one imagines anything of who do the things that no one can imagine.",
        "author": "Alan Turing",
        "category": "Science & Tech"
    },
    {
        "id": 28,
        "quote": "That brain of mine is something more than merely mortal; as time will show.",
        "author": "Ada Lovelace",
        "category": "Science & Tech"
    },
    {
        "id": 29,
        "quote": "It is not the strongest of the species that survives, nor the most intelligent, but the one most responsive to change.",
        "author": "Charles Darwin",
        "category": "Science & Tech"
    },
    {
        "id": 30,
        "quote": "An expert is a person who has made all the mistakes that can be made in a very narrow field.",
        "author": "Niels Bohr",
        "category": "Science & Tech"
    },
    {
        "id": 31,
        "quote": "The most dangerous phrase in the language is, 'We've always done it this way.'",
        "author": "Grace Hopper",
        "category": "Science & Tech"
    },
    {
        "id": 32,
        "quote": "Innovation distinguishes between a leader and a follower.",
        "author": "Steve Jobs",
        "category": "Science & Tech"
    },
    {
        "id": 33,
        "quote": "We need diversity of thought in the world to face the new challenges.",
        "author": "Tim Berners-Lee",
        "category": "Science & Tech"
    },
    {
        "id": 34,
        "quote": "Look deep into nature, and then you will understand everything better.",
        "author": "Albert Einstein",
        "category": "Science & Tech"
    },
    {
        "id": 35,
        "quote": "I seem to have been only like a boy playing on the seashore, finding a smoother pebble or prettier shell, whilst the great ocean of truth lay undiscovered before me.",
        "author": "Isaac Newton",
        "category": "Science & Tech"
    },
    {
        "id": 36,
        "quote": "Science is a way of thinking much more than it is a body of knowledge.",
        "author": "Carl Sagan",
        "category": "Science & Tech"
    },

    # Literature & Poetry (37-53)
    {
        "id": 37,
        "quote": "To be, or not to be, that is the question.",
        "author": "William Shakespeare",
        "category": "Literature"
    },
    {
        "id": 38,
        "quote": "The secret of getting ahead is getting started.",
        "author": "Mark Twain",
        "category": "Literature"
    },
    {
        "id": 39,
        "quote": "Be yourself; everyone else is already taken.",
        "author": "Oscar Wilde",
        "category": "Literature"
    },
    {
        "id": 40,
        "quote": "In a time of deceit telling the truth is a revolutionary act.",
        "author": "George Orwell",
        "category": "Literature"
    },
    {
        "id": 41,
        "quote": "Lock up your libraries if you like; but there is no gate, no lock, no bolt that you can set upon the freedom of my mind.",
        "author": "Virginia Woolf",
        "category": "Literature"
    },
    {
        "id": 42,
        "quote": "Everyone thinks of changing the world, but no one thinks of changing himself.",
        "author": "Leo Tolstoy",
        "category": "Literature"
    },
    {
        "id": 43,
        "quote": "To live without hope is to cease to live.",
        "author": "Fyodor Dostoevsky",
        "category": "Literature"
    },
    {
        "id": 44,
        "quote": "There is no charm equal to tenderness of heart.",
        "author": "Jane Austen",
        "category": "Literature"
    },
    {
        "id": 45,
        "quote": "What matters in life is not what happens to you, but what you remember and how you remember it.",
        "author": "Gabriel García Márquez",
        "category": "Literature"
    },
    {
        "id": 46,
        "quote": "There is no greater agony than bearing an untold story inside you.",
        "author": "Maya Angelou",
        "category": "Literature"
    },
    {
        "id": 47,
        "quote": "Hope is the thing with feathers that perches in the soul.",
        "author": "Emily Dickinson",
        "category": "Literature"
    },
    {
        "id": 48,
        "quote": "Even the darkest night will end and the sun will rise.",
        "author": "Victor Hugo",
        "category": "Literature"
    },
    {
        "id": 49,
        "quote": "Courage is grace under pressure.",
        "author": "Ernest Hemingway",
        "category": "Literature"
    },
    {
        "id": 50,
        "quote": "A book must be the axe for the frozen sea within us.",
        "author": "Franz Kafka",
        "category": "Literature"
    },
    {
        "id": 51,
        "quote": "All the world's a stage, and all the men and women merely players.",
        "author": "William Shakespeare",
        "category": "Literature"
    },
    {
        "id": 52,
        "quote": "The two most important days in your life are the day you are born and the day you find out why.",
        "author": "Mark Twain",
        "category": "Literature"
    },
    {
        "id": 53,
        "quote": "We are all in the gutter, but some of us are looking at the stars.",
        "author": "Oscar Wilde",
        "category": "Literature"
    },

    # Leadership & Courage (54-70)
    {
        "id": 54,
        "quote": "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        "author": "Winston Churchill",
        "category": "Leadership"
    },
    {
        "id": 55,
        "quote": "It always seems impossible until it's done.",
        "author": "Nelson Mandela",
        "category": "Leadership"
    },
    {
        "id": 56,
        "quote": "Darkness cannot drive out darkness; only light can do that. Hate cannot drive out hate; only love can do that.",
        "author": "Martin Luther King Jr.",
        "category": "Leadership"
    },
    {
        "id": 57,
        "quote": "Nearly all men can stand adversity, but if you want to test a man's character, give him power.",
        "author": "Abraham Lincoln",
        "category": "Leadership"
    },
    {
        "id": 58,
        "quote": "Be the change that you wish to see in the world.",
        "author": "Mahatma Gandhi",
        "category": "Leadership"
    },
    {
        "id": 59,
        "quote": "The future belongs to those who believe in the beauty of their dreams.",
        "author": "Eleanor Roosevelt",
        "category": "Leadership"
    },
    {
        "id": 60,
        "quote": "Do what you can, with what you have, where you are.",
        "author": "Theodore Roosevelt",
        "category": "Leadership"
    },
    {
        "id": 61,
        "quote": "In the midst of chaos, there is also opportunity.",
        "author": "Sun Tzu",
        "category": "Leadership"
    },
    {
        "id": 62,
        "quote": "The only thing we have to fear is fear itself.",
        "author": "Franklin D. Roosevelt",
        "category": "Leadership"
    },
    {
        "id": 63,
        "quote": "One child, one teacher, one book, one pen can change the world.",
        "author": "Malala Yousafzai",
        "category": "Leadership"
    },
    {
        "id": 64,
        "quote": "Every great dream begins with a dreamer. Always remember, you have within you the strength, the patience, and the passion to reach for the stars to change the world.",
        "author": "Harriet Tubman",
        "category": "Leadership"
    },
    {
        "id": 65,
        "quote": "Ask not what your country can do for you - ask what you can do for your country.",
        "author": "John F. Kennedy",
        "category": "Leadership"
    },
    {
        "id": 66,
        "quote": "There is nothing impossible to him who will try.",
        "author": "Alexander the Great",
        "category": "Leadership"
    },
    {
        "id": 67,
        "quote": "If you're going through hell, keep going.",
        "author": "Winston Churchill",
        "category": "Leadership"
    },
    {
        "id": 68,
        "quote": "A leader is a dealer in hope.",
        "author": "Napoleon Bonaparte",
        "category": "Leadership"
    },
    {
        "id": 69,
        "quote": "I have a dream that one day this nation will rise up and live out the true meaning of its creed.",
        "author": "Martin Luther King Jr.",
        "category": "Leadership"
    },
    {
        "id": 70,
        "quote": "No one can make you feel inferior without your consent.",
        "author": "Eleanor Roosevelt",
        "category": "Leadership"
    },

    # Wisdom & Life (71-85)
    {
        "id": 71,
        "quote": "Do not go where the path may lead, go instead where there is no path and leave a trail.",
        "author": "Ralph Waldo Emerson",
        "category": "Wisdom"
    },
    {
        "id": 72,
        "quote": "Go confidently in the direction of your dreams. Live the life you have imagined.",
        "author": "Henry David Thoreau",
        "category": "Wisdom"
    },
    {
        "id": 73,
        "quote": "The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart.",
        "author": "Helen Keller",
        "category": "Wisdom"
    },
    {
        "id": 74,
        "quote": "Tell me and I forget. Teach me and I remember. Involve me and I learn.",
        "author": "Benjamin Franklin",
        "category": "Wisdom"
    },
    {
        "id": 75,
        "quote": "Yesterday I was clever, so I wanted to change the world. Today I am wise, so I am changing myself.",
        "author": "Rumi",
        "category": "Wisdom"
    },
    {
        "id": 76,
        "quote": "Whoever is happy will make others happy too.",
        "author": "Anne Frank",
        "category": "Wisdom"
    },
    {
        "id": 77,
        "quote": "When we are no longer able to change a situation, we are challenged to change ourselves.",
        "author": "Viktor Frankl",
        "category": "Wisdom"
    },
    {
        "id": 78,
        "quote": "Peace comes from within. Do not seek it without.",
        "author": "Buddha",
        "category": "Wisdom"
    },
    {
        "id": 79,
        "quote": "The good life is one inspired by love and guided by knowledge.",
        "author": "Bertrand Russell",
        "category": "Wisdom"
    },
    {
        "id": 80,
        "quote": "You are never too old to set another goal or to dream a new dream.",
        "author": "C.S. Lewis",
        "category": "Wisdom"
    },
    {
        "id": 81,
        "quote": "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
        "author": "Ralph Waldo Emerson",
        "category": "Wisdom"
    },
    {
        "id": 82,
        "quote": "An investment in knowledge pays the best interest.",
        "author": "Benjamin Franklin",
        "category": "Wisdom"
    },
    {
        "id": 83,
        "quote": "Simplicity is the ultimate sophistication.",
        "author": "Clare Boothe Luce",
        "category": "Wisdom"
    },
    {
        "id": 84,
        "quote": "The greatest glory in living lies not in never falling, but in rising every time we fall.",
        "author": "Nelson Mandela",
        "category": "Wisdom"
    },
    {
        "id": 85,
        "quote": "In three words I can sum up everything I've learned about life: it goes on.",
        "author": "Robert Frost",
        "category": "Wisdom"
    },

    # Art & Creativity (86-100)
    {
        "id": 86,
        "quote": "Learning never exhausts the mind.",
        "author": "Leonardo da Vinci",
        "category": "Art & Creativity"
    },
    {
        "id": 87,
        "quote": "Every child is an artist. The problem is how to remain an artist once we grow up.",
        "author": "Pablo Picasso",
        "category": "Art & Creativity"
    },
    {
        "id": 88,
        "quote": "I dream my painting and I paint my dream.",
        "author": "Vincent van Gogh",
        "category": "Art & Creativity"
    },
    {
        "id": 89,
        "quote": "The greater danger for most of us lies not in setting our aim too high and falling short; but in setting our aim too low, and achieving our mark.",
        "author": "Michelangelo",
        "category": "Art & Creativity"
    },
    {
        "id": 90,
        "quote": "Have no fear of perfection - you'll never reach it.",
        "author": "Salvador Dalí",
        "category": "Art & Creativity"
    },
    {
        "id": 91,
        "quote": "I perhaps owe having become a painter to flowers.",
        "author": "Claude Monet",
        "category": "Art & Creativity"
    },
    {
        "id": 92,
        "quote": "To create one's own world in any of the arts takes courage.",
        "author": "Georgia O'Keeffe",
        "category": "Art & Creativity"
    },
    {
        "id": 93,
        "quote": "Creativity takes courage.",
        "author": "Henri Matisse",
        "category": "Art & Creativity"
    },
    {
        "id": 94,
        "quote": "At the end of the day, we can endure much more than we think we can.",
        "author": "Frida Kahlo",
        "category": "Art & Creativity"
    },
    {
        "id": 95,
        "quote": "Art is what you can get away with.",
        "author": "Andy Warhol",
        "category": "Art & Creativity"
    },
    {
        "id": 96,
        "quote": "Art washes away from the soul the dust of everyday life.",
        "author": "Pablo Picasso",
        "category": "Art & Creativity"
    },
    {
        "id": 97,
        "quote": "If you hear a voice within you say 'you cannot paint,' then by all means paint, and that voice will be silenced.",
        "author": "Vincent van Gogh",
        "category": "Art & Creativity"
    },
    {
        "id": 98,
        "quote": "Simplicity is the ultimate sophistication.",
        "author": "Leonardo da Vinci",
        "category": "Art & Creativity"
    },
    {
        "id": 99,
        "quote": "Don't think about making art, just get it done. Let everyone else decide if it's good or bad, whether they love it or hate it. While they are deciding, make even more art.",
        "author": "Andy Warhol",
        "category": "Art & Creativity"
    },
    {
        "id": 100,
        "quote": "I found I could say things with color and shapes that I couldn't say any other way - things I had no words for.",
        "author": "Georgia O'Keeffe",
        "category": "Art & Creativity"
    }
]

assert len(quotes) == 100, f"Expected 100 quotes, got {len(quotes)}"
with open("quotes.json", "w", encoding="utf-8") as f:
    json.dump(quotes, f, indent=2, ensure_ascii=False)
print(f"Successfully generated quotes.json with {len(quotes)} quotes.")
