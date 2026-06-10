export type FlashCARD={
    mode:"imageToWord"|"wordToImage";
    question:string;
    answer:string;
    image?: any;
    video?: any;
    hint?: string;
};

