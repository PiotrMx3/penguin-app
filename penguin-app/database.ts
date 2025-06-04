import { Collection, MongoClient, SortDirection } from "mongodb";
import dotenv from "dotenv";
import { Penguin, Researcher, Species } from "./types";
import bcrypt from "bcrypt"


dotenv.config();

export const client = new MongoClient(process.env.MONGO_URI || "mongodb://localhost:27017");


const researchersCollection:Collection<Researcher> = client.db("juni-examen").collection<Researcher>("researcher");
const speciesCollection:Collection<Species> = client.db("juni-examen").collection<Species>("species");
const penguinsCollection:Collection<Penguin> = client.db("juni-examen").collection<Penguin>("penguin");

export const SALT_ROUNDS = 10;

async function exit() {
    try {
        await client.close();
        console.log("Disconnected from database");
    } catch (error) {
        console.error(error);
    }
    process.exit(0);
}

export async function getAllResearchers(): Promise<Researcher[]> {

    const result = await researchersCollection.find({}).toArray();
    return result;
}

export async function getAllSpecies(): Promise<Species[]> {
    const result = await speciesCollection.find<Species>({}).toArray();
    return result;
}

export async function getSpeciesById(id: string): Promise<Species | null> {

    
    const result = await speciesCollection.findOne<Species>({id: parseInt(id)})

    return result;
}

export async function updateResearcher(username: string, newPincode: string): Promise<void> {
    
}

export async function assignPenguinToResearcher(penguinId: number, researcherString: string): Promise<void> {  

    const penguin = await penguinsCollection.findOne<Penguin>({id: penguinId });

    const payload = {
        ...penguin,
        assigned_to: researcherString
    };

    // await penguinsCollection.updateOne()
};

export async function getAllPenguins(sortField: string, sortDirection: SortDirection, q: string): Promise<Penguin[]> {

const direction = sortDirection === "desc" ? -1 : 1;
const config = q === "" ? {} : { $text: { $search: q } }

const result = await penguinsCollection.find(config).sort({[sortField]: direction }).toArray();

return result;

}

export async function getPenguinsBySpecies(id: number): Promise<Penguin[]> {

    const result = await penguinsCollection.find<Penguin>({species_id: id}).toArray()
    return result;
}

export async function login(username: string, pincode: string): Promise<Researcher | null> {
    
        if (username === "" || pincode === "") {
        throw new Error("username and pincode required");
    }
    let user: Researcher  | null = await researchersCollection.findOne<Researcher>({username: username});
    if (user) {
        if (await bcrypt.compare(pincode, user.pincode!)) {
            return user;
        } else {
            throw new Error("pincode incorrect");
        }
    } else {
        throw new Error("User not found");
    }
}

async function seedResearchers(): Promise<void> {

    if(await researchersCollection.countDocuments() > 0) {
        console.log("researchers already exist in Db")
        return;
    }

const response = await fetch("https://raw.githubusercontent.com/similonap/json/refs/heads/master/penguins/researchers.json");
if(!response.ok) throw new Error("Error in seedResearchers" + response.status);

const data: Researcher[] = await response.json();

const hashing = data.map(async (el) => {
if (!el.pincode) throw new Error("error pincode");

    return {
        ...el,
        pincode: await bcrypt.hash(el.pincode, SALT_ROUNDS)
    }
});

const formattedData:Researcher[] = await Promise.all(hashing);

console.log("Seeding researchers in Db")
await researchersCollection.deleteMany({});
await researchersCollection.insertMany(formattedData);
   
}

async function seedSpecies(): Promise<void> {

        if(await speciesCollection.countDocuments() > 0) {
        console.log("species already exist in Db")
        return;
    }
    
const response = await fetch("https://raw.githubusercontent.com/similonap/json/refs/heads/master/penguins/species.json");
if(!response.ok) throw new Error("Error in species" + response.status);

const data: Species[] = await response.json();

console.log("Seeding species in Db")
await speciesCollection.deleteMany({});
await speciesCollection.insertMany(data);

}

async function seedPenguins(): Promise<void> {

            if(await penguinsCollection.countDocuments() > 0) {
        console.log("penguins already exist in Db")
        return;
    }
    
const response = await fetch("https://raw.githubusercontent.com/similonap/json/refs/heads/master/penguins/penguins.json");
if(!response.ok) throw new Error("Error in penguis" + response.status);

const data: Penguin[] = await response.json();

const allSpecies = await getAllSpecies();

const formattedData: Penguin[] = data.map((p) => {

    const spices = allSpecies.find(id => id.id === p.species_id)
    if(!spices) throw new Error("species_id not found");

    return {
        ...p,
        species: spices
    }

})

console.log("Seeding penguins in Db")
await penguinsCollection.deleteMany({});
await penguinsCollection.insertMany(formattedData);


    
}

export async function seedDatabase() {

    await seedResearchers();
    await seedSpecies();
    await seedPenguins();
    await penguinsCollection.dropIndex("*")
    await penguinsCollection.createIndex({ nickname: "text", description: "text", species: "text", island:"text", assigned_to: "text"  });
}

export async function connect() {
    await client.connect();
    await seedDatabase();
    console.log("Connected to database");
    process.on("SIGINT", exit);
}