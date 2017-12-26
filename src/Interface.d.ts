interface Video {
    file: String,
    isProcessing: Boolean
    infos?: VideoInfos
    encoderOptions?: EncoderOptions
}

interface VideoInfos {
    
}

interface EncoderOptions {
    codecVideo: String
    videos: Array<String>
    codecAudio: String
    audios: Array<String>
    subtitles: Array<String>
}

interface Encoder {
    isProcessing: Boolean
}