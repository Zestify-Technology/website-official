import Pocketbase from 'pocketbase'

const pb = new Pocketbase(process.env.NEXT_PUBLIC_POCKETBASE_URL)

let isAuthenticated = false;

export async function pbAI() {
    
    if(isAuthenticated && pb.authStore.isValid){
        return pb;
    }

    await pb.collection("users").authWithPassword(
        process.env.AI_PB_USERNAME,
        process.env.AI_PB_PASSWORD
    )

    isAuthenticated = true
    return pb;


}   


export default pb;

