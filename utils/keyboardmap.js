var IllegalKeyCodes = [
"CapsLock",
"Backspace",
"Dead",
"Tab",
"CapsLock",
"Shift",
"Control",
"Alt",
"AltGraph",
"Control",
"NumLock"
];

function KeyIsIllegal(keyvalue)
{
    if ( IllegalKeyCodes.indexOf(keyvalue)>-1)
        return true;
    else
        return false;
}