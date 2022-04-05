import { GroupMember } from '../graphql/types';

export function chooseSecretSanta(groupMembersArray: GroupMember[]) {
	const randomGroupMembers = randomizeArray(groupMembersArray);
	let duplicateArray = [].concat(groupMembersArray);
	let arrayLength: number;
	let chosingIndex: number;
	let picksIndex: number;

	if (randomGroupMembers.length != groupMembersArray.length) {
		throw new Error('lost an index when randomizing group members array');
	} else {
		arrayLength = randomGroupMembers.length;
	}

	while (arrayLength > 0) {
		chosingIndex = arrayLength - 1;
		picksIndex = Math.floor(Math.random() * duplicateArray.length);

		if (randomGroupMembers[chosingIndex]['secret_pick']) {
			arrayLength--;
		} else if (
			randomGroupMembers[chosingIndex].first_name !==
			duplicateArray[picksIndex].first_name
		) {
			randomGroupMembers[chosingIndex][
				'secret_pick'
			] = `${duplicateArray[picksIndex].first_name} ${duplicateArray[picksIndex].last_name} `;
			duplicateArray.splice(picksIndex, 1);
			arrayLength--;
		} else {
			chosingIndex = Math.floor(Math.random() * arrayLength);
		}
	}

	return randomGroupMembers;
}

export function randomizeArray(inputArray) {
	let resultArray = [].concat(inputArray);
	let arrayLength: number = inputArray.length;
	let temp: any;
	let index: any;

	while (arrayLength > 0) {
		index = Math.floor(Math.random() * arrayLength);

		arrayLength--;

		temp = resultArray[arrayLength];
		resultArray[arrayLength] = resultArray[index];
		resultArray[index] = temp;
	}
	return resultArray;
}
