import { groupMember } from "../../pages";

export function chooseSecretSanta(groupMembersArray: groupMember[]) {

    console.log('entered chooisng...')
    
    const randomGroupMembers = randomizeArray(groupMembersArray)
    let duplicateArray = [].concat(groupMembersArray)
    let arrayLength: number;
    let chosingIndex: number;
    let picksIndex: number;


    if(randomGroupMembers.length != groupMembersArray.length ){
        throw new Error('lost an index when randomizing group members array')
    } else {
        arrayLength = randomGroupMembers.length
    }

    while ( arrayLength > 0) {

        chosingIndex = arrayLength - 1;
        picksIndex = Math.floor(Math.random() * duplicateArray.length);

        if (randomGroupMembers[chosingIndex]['secret_pick']){
            console.log('already has a pick')
            arrayLength--;
        }
        else if(randomGroupMembers[chosingIndex].email !== duplicateArray[picksIndex].email ) {
            randomGroupMembers[chosingIndex]['secret_pick'] = duplicateArray[picksIndex]
            duplicateArray.splice(picksIndex,1)
            arrayLength--;
        } else {
            chosingIndex = Math.floor(Math.random() * arrayLength);
        }
      
    }
    console.log('returned array: ', randomGroupMembers)

    return randomGroupMembers
}

export function randomizeArray(inputArray) {
    
    let resultArray = [].concat(inputArray)
    let arrayLength: number = inputArray.length;
    let temp: any;
    let index: any;
    
    while (arrayLength > 0) {
        index = Math.floor(Math.random() * arrayLength)

        arrayLength--;

        temp = resultArray[arrayLength];
        resultArray[arrayLength] = resultArray[index]
        resultArray[index] = temp;

    } 
    return resultArray
}