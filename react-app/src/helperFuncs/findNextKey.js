export default function findNextKey(parentObj, currKey) {
    // finds and returns the next key in the parentObj relative to currKey

    let keys = Object.keys(parentObj);
    
    let nextKeyIndex = keys.indexOf(currKey)+1;
    
    let nextKeyValue = keys[nextKeyIndex];
    
    if (!nextKeyValue) return keys[0];

    return nextKeyValue;

}