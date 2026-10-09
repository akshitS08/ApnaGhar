import { ID } from "react-native-appwrite";

import { config, tablesDB } from "./appwrite";

import {
    agentImages,
    galleryImages,
    propertiesImages,
    reviewImages,
} from "./data";

const TABLES = {
  AGENT: config.agentsTableId,
  REVIEWS: config.reviewsTableId,
  GALLERY: config.galleriesTableId,
  PROPERTY: config.propertiesTableId,
};

const propertyTypes = [
  "House",
  "Townhouse",
  "Condo",
  "Duplex",
  "Studio",
  "Villa",
  "Apartment",
  "Other",
];

const facilities = ["Laundry", "Parking", "Gym", "Wifi", "Pet-friendly"];

function getRandomSubset<T>(
  array: T[],
  minItems: number,
  maxItems: number,
): T[] {
  if (minItems > maxItems) {
    throw new Error("minItems cannot be greater than maxItems");
  }

  if (minItems < 0 || maxItems > array.length) {
    throw new Error(
      "minItems or maxItems are out of valid range for the array",
    );
  }

  const subsetSize =
    Math.floor(Math.random() * (maxItems - minItems + 1)) + minItems;

  const arrayCopy = [...array];

  for (let i = arrayCopy.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    [arrayCopy[i], arrayCopy[randomIndex]] = [
      arrayCopy[randomIndex],
      arrayCopy[i],
    ];
  }

  return arrayCopy.slice(0, subsetSize);
}

async function seed() {
  try {
    // --------------------------------------------------
    // 1. CLEAR EXISTING DATA
    // --------------------------------------------------

    for (const key in TABLES) {
      const tableId = TABLES[key as keyof typeof TABLES];

      const rows = await tablesDB.listRows({
        databaseId: config.databaseId!,
        tableId: tableId!,
      });

      for (const row of rows.rows) {
        await tablesDB.deleteRow({
          databaseId: config.databaseId!,
          tableId: tableId!,
          rowId: row.$id,
        });
      }
    }

    console.log("Cleared all existing data.");

    // --------------------------------------------------
    // 2. SEED AGENTS
    // --------------------------------------------------

    const agents = [];

    for (let i = 1; i <= 5; i++) {
      const agent = await tablesDB.createRow({
        databaseId: config.databaseId!,
        tableId: TABLES.AGENT!,
        rowId: ID.unique(),
        data: {
          name: `Agent ${i}`,
          email: `agent${i}@example.com`,
          avatar: agentImages[Math.floor(Math.random() * agentImages.length)],
        },
      });

      agents.push(agent);
    }

    console.log(`Seeded ${agents.length} agents.`);

    // --------------------------------------------------
    // 3. SEED GALLERIES
    // --------------------------------------------------

    const galleries = [];

    for (const image of galleryImages) {
      const gallery = await tablesDB.createRow({
        databaseId: config.databaseId!,
        tableId: TABLES.GALLERY!,
        rowId: ID.unique(),
        data: {
          image,
        },
      });

      galleries.push(gallery);
    }

    console.log(`Seeded ${galleries.length} galleries.`);

    // --------------------------------------------------
    // 4. SEED PROPERTIES
    // --------------------------------------------------

    const properties = [];

    for (let i = 1; i <= 20; i++) {
      const assignedAgent = agents[Math.floor(Math.random() * agents.length)];

      const assignedGalleries = getRandomSubset(
        galleries,
        3,
        Math.min(8, galleries.length),
      );

      const selectedFacilities = getRandomSubset(
        facilities,
        1,
        facilities.length,
      );

      const image =
        propertiesImages[i] ??
        propertiesImages[Math.floor(Math.random() * propertiesImages.length)];

      const property = await tablesDB.createRow({
        databaseId: config.databaseId!,
        tableId: TABLES.PROPERTY!,
        rowId: ID.unique(),
        data: {
          name: `Property ${i}`,

          type: propertyTypes[Math.floor(Math.random() * propertyTypes.length)],

          description: `This is the description for Property ${i}.`,

          address: `123 Property Street, City ${i}`,

          geolocation: `192.168.1.${i}, 192.168.1.${i}`,

          price: Math.floor(Math.random() * 9000) + 1000,

          area: Math.floor(Math.random() * 3000) + 500,

          bedrooms: Math.floor(Math.random() * 5) + 1,

          bathrooms: Math.floor(Math.random() * 5) + 1,

          rating: Math.floor(Math.random() * 5) + 1,

          facilities: selectedFacilities,

          image,

          agent: assignedAgent.$id,

          gallery: assignedGalleries.map((gallery) => gallery.$id),
        },
      });

      properties.push(property);

      console.log(`Seeded property: ${property.name}`);
    }

    console.log(`Seeded ${properties.length} properties.`);

    // --------------------------------------------------
    // 5. SEED REVIEWS
    // --------------------------------------------------

    const reviews = [];

    for (let i = 1; i <= 20; i++) {
      const assignedProperty =
        properties[Math.floor(Math.random() * properties.length)];

      const review = await tablesDB.createRow({
        databaseId: config.databaseId!,
        tableId: TABLES.REVIEWS!,
        rowId: ID.unique(),
        data: {
          name: `Reviewer ${i}`,

          avatar: reviewImages[Math.floor(Math.random() * reviewImages.length)],

          review: `This is a review by Reviewer ${i}.`,

          rating: Math.floor(Math.random() * 5) + 1,

          property: assignedProperty.$id,
        },
      });

      reviews.push(review);
    }

    console.log(`Seeded ${reviews.length} reviews.`);

    console.log("Data seeding completed.");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
}

export default seed;
