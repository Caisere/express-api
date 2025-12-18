import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

const creatorId = process.env.CREATOR_ID;


const movies = [
    {   
        title: "Inception",
        overview: "A skilled thief leads a team into dreams to steal secrets from the subconscious.",
        releaseYear: 2010,
        genres: ["Sci-Fi", "Thriller"],
        runtime: 148,
        posterUrl: "https://example.com/inception.jpg",
        createdBy: creatorId
    },
    {   title: "The Dark Knight",
        overview: "Batman faces the Joker, a criminal mastermind spreading chaos in Gotham.",
        releaseYear: 2008,
        genres: ["Action", "Crime", "Drama"],
        runtime: 152,
        posterUrl: "https://example.com/dark-knight.jpg",
        createdBy: creatorId
    },
    {
        title: "Interstellar",
        overview: "Explorers travel through a wormhole in space to save humanity.",
        releaseYear: 2014,
        genres: ["Sci-Fi", "Adventure", "Drama"],
        runtime: 169,
        posterUrl: "https://example.com/interstellar.jpg",
        createdBy: creatorId
    },
    {
        title: "The Matrix",
        overview: "A hacker discovers reality is a simulation controlled by machines.",
        releaseYear: 1999,
        genres: ["Sci-Fi", "Action"],
        runtime: 136,
        posterUrl: "https://example.com/matrix.jpg",
        createdBy: creatorId
    },
    {
        title: "Gladiator",
        overview: "A former Roman general seeks revenge against a corrupt emperor.",
        releaseYear: 2000,
        genres: ["Action", "Drama", "History"],
        runtime: 155,
        posterUrl: "https://example.com/gladiator.jpg",
        createdBy: creatorId
    },
    {
        title: "The Shawshank Redemption",
        overview: "Two imprisoned men bond over years, finding hope and redemption.",
        releaseYear: 1994,
        genres: ["Drama"],
        runtime: 142,
        posterUrl: "https://example.com/shawshank.jpg",
        createdBy: creatorId
    },
    {
        title: "Fight Club",
        overview: "An office worker forms an underground fight club with a soap salesman.",
        releaseYear: 1999,
        genres: ["Drama", "Thriller"],
        runtime: 139,
        posterUrl: "https://example.com/fight-club.jpg",
        createdBy: creatorId
    },
    {
        title: "Forrest Gump",
        overview: "The life journey of a man with a low IQ who influences major events.",
        releaseYear: 1994,
        genres: ["Drama", "Romance"],
        runtime: 142,
        posterUrl: "https://example.com/forrest-gump.jpg",
        createdBy: creatorId
    },
    {
        title: "The Lord of the Rings: The Fellowship of the Ring",
        overview: "A hobbit begins a journey to destroy a powerful ring.",
        releaseYear: 2001,
        genres: ["Fantasy", "Adventure"],
        runtime: 178,
        posterUrl: "https://example.com/lotr-fellowship.jpg",
        createdBy: creatorId
    },
    {
        title: "The Godfather",
        overview: "The aging patriarch of a crime family transfers control to his son.",
        releaseYear: 1972,
        genres: ["Crime", "Drama"],
        runtime: 175,
        posterUrl: "https://example.com/godfather.jpg",
        createdBy: creatorId
    },
    {
        title: "Pulp Fiction",
        overview: "Interconnected stories of crime unfold in Los Angeles.",
        releaseYear: 1994,
        genres: ["Crime", "Drama"],
        runtime: 154,
        posterUrl: "https://example.com/pulp-fiction.jpg",
        createdBy: creatorId
    },
    {
        title: "Avatar",
        overview: "A marine explores an alien planet and becomes torn between two worlds.",
        releaseYear: 2009,
        genres: ["Sci-Fi", "Adventure"],
        runtime: 162,
        posterUrl: "https://example.com/avatar.jpg",
        createdBy: creatorId
    },
    {
        title: "Titanic",
        overview: "A romance blossoms aboard a doomed luxury ship.",
        releaseYear: 1997,
        genres: ["Romance", "Drama"],
        runtime: 195,
        posterUrl: "https://example.com/titanic.jpg",
        createdBy: creatorId
    },
    {
        title: "Whiplash",
        overview: "A young drummer faces intense pressure from an abusive instructor.",
        releaseYear: 2014,
        genres: ["Drama", "Music"],
        runtime: 106,
        posterUrl: "https://example.com/whiplash.jpg",
        createdBy: creatorId
    },
    {
        title: "Parasite",
        overview: "A poor family schemes to infiltrate a wealthy household.",
        releaseYear: 2019,
        genres: ["Thriller", "Drama"],
        runtime: 132,
        posterUrl: "https://example.com/parasite.jpg",
        createdBy: creatorId
    }
];

async function main () {
    for (const movie of movies) {
        await prisma.movie.create({
            data: movie
        })
        console.log(`Created movie ${movie.title} Successfully`)
    }

    console.log('Seeding Completed')
}

main().catch((err) => {
    console.error(err) 
    process.exit(1) //close server by exist on error
}).finally(async () => {
    // disconnect from our database table no matter the outcome, success or error
    await prisma.$disconnect()
})