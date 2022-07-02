import React from 'react';
import { DocumentaryCard } from '../documentary-card/documentary-card';
import { DocumentaryView } from '../documentary-view/documentary-view';

export class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            documentaries: [
                {
                    "_id": {
                        "$oid": "62b0c33a77845f0f03ca6df4"
                    },
                    "Title": "One Strange Rock",
                    "Description": "The extraordinary story of Earth and why it is special and uniquely brimming with life among a largely unknown but harsh cosmic arena; astronauts tell the story of Earth through a unique perspective.",
                    "ReleaseYear": "2018",
                    "FeaturedPersonality": {
                        "Name": "Will Smith",
                        "Birth": "1968",
                        "Biography": "Williard Christopher Smith, better known by his stage name Will Smith, was born in Philadelphia, United States. He is a renowned comedian, composer, executive producer, actor and rap singer, standing out mainly in these last two. He has the merit of being the only actor so far to participate consecutively in a line of eight films that generated more than one hundred million dollars in revenues and headed the first positions after being released. After starring in the company of his son, in the movie, The Pursuit of Happiness, Will won the Oscar Award as best actor."
                    },
                    "Genre": {
                        "Name": "Science",
                        "Description": "Scientific documentaries portrays science to the viewer in a way that is engaging, entertaining, and educational."
                    },
                    "ImagePath": "https://m.media-amazon.com/images/M/MV5BMzBlYjhmYTMtNzY1ZS00ZGU2LWFmMzktYTg5ZGU1N2JlMGRmXkEyXkFqcGdeQXVyMTg3MDg4NzM@._V1_FMjpg_UX1000_.jpg",
                    "Featured": true
                },
                {
                    "_id": {
                        "$oid": "62b0c35777845f0f03ca6df5"
                    },
                    "Title": "Unnatural Selection",
                    "Description": "DNA, the very essence of life, can now be altered. Not only by Harvard geneticists and multi-billion dollar corporations, but also by renegade biohackers working out of their garages.",
                    "ReleaseYear": "2019",
                    "FeaturedPersonality": {
                        "Name": "Joe Egender",
                        "Birth": "1976",
                        "Biography": "Joe Egender was born in Kansas City, Missouri, USA. He is an actor and producer, known for Unnatural Selection (2019), The Night Of (2016) and American Horror Story (2011)."
                    },
                    "Genre": {
                        "Name": "Science",
                        "Description": "Scientific documentaries portrays science to the viewer in a way that is engaging, entertaining, and educational."
                    },
                    "ImagePath": "https://m.media-amazon.com/images/M/MV5BYmRjOWU0MDAtMzRiZi00ZGUzLWFmZjItOTQwZDAxYzlkZjM1XkEyXkFqcGdeQXVyMjMyNTY1MDc@._V1_FMjpg_UX1000_.jpg",
                    "Featured": true
                },
                {
                    "_id": {
                        "$oid": "62b0c37077845f0f03ca6df6"
                    },
                    "Title": "Planet Earth II",
                    "Description": "The wildlife documentary series with Sir David Attenborough continues with a unique and intimate glimpse into secretive lives of mountain-dwelling animals.",
                    "ReleaseYear": "2016",
                    "FeaturedPersonality": {
                        "Name": "David Attenborough",
                        "Birth": "1926",
                        "Biography": "David Attenborough, Godfather of natural history TV, has introduced generations to the world’s furry and feathered friends. Beyond natural history he’s had a huge influence as a broadcaster, introducing colour TV when he was Controller of BBC Two. Born in London in 1926, Attenborough collected fossils as a child and gained a Natural Sciences degree from Cambridge. Since the launch of his famous Zoo Quest series in 1954 to the recent Planet Earth, he has surveyed almost every aspect of life on earth. Attenborough’s trophy cabinet has recently acquired the prestigious Lifetime Achievement Award. In addition, he has been knighted, had species named after him and the Sir David Attenborough Studio is planned for London’s Natural History Museum in 2008."
                    },
                    "Genre": {
                        "Name": "Nature",
                        "Description": "Nature documentaries portray animals, plants or other non-human living creatures, usually in their natural habitat, educating viewers on our, often hidden, natural world."
                    },
                    "ImagePath": "https://m.media-amazon.com/images/M/MV5BZWYxODViMGYtMGE2ZC00ZGQ3LThhMWUtYTVkNGE3OWU4NWRkL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMjYwNDA2MDE@._V1_FMjpg_UX1000_.jpg",
                    "Featured": true
                }

            ],
            selectedDocumentary: null
        };
    }

    setSelectedDocumentary(newSelectedDocumentary) {
        this.setState({
            selectedDocumentary: newSelectedDocumentary
        });
    }


    render() {
        const { documentaries, selectedDocumentary } = this.state;

        if (documentaries.length === 0) return <div className="main-view">The list is empty!</div>;

        return (
            <div className="main-view">
                {selectedDocumentary
                    ? <DocumentaryView documentary={selectedDocumentary} onBackClick={newSelectedDocumentary => { this.setSelectedDocumentary(newSelectedDocumentary); }} />
                    : documentaries.map(documentary => (
                        <DocumentaryCard key={documentary._id} documentary={documentary} onDocumentaryClick={(documentary) => { this.setSelectedDocumentary(documentary) }} />
                    ))
                }
            </div>
        );
    }

}
