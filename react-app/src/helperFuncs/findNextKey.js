export default function findNextKey(parentObj, currKey) {
    // finds and returns the next key in the parentObj relative to currKey

    let keys = Object.keys(parentObj);
    // console.log('PARENT OBJ KEYS: ', keys);
    // console.log('CURRENT KEY: ', currKey);
    // console.log('INDEX OF CURRENT KEY: ', keys.indexOf(currKey));
    // console.log('TYPE OF OBJ KEY: ', typeof (keys[0]))
    // console.log('TYPE OF CURRKEY: ', typeof(currKey));
    
    let nextKeyIndex = keys.indexOf(currKey)+1;

    
    let nextKeyValue = keys[nextKeyIndex];
    
    if (!nextKeyValue) return keys[0];

    return nextKeyValue;

}