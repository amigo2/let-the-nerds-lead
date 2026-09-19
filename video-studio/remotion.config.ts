import { Config } from '@remotion/cli/config'

Config.setVideoImageFormat('jpeg')
Config.setOverwriteOutput(true)
// YouTube standard. Shorts get their own composition later, same components.
Config.setCodec('h264')

// Voiceover lives with the course, not with the tool: staticFile('audio/x.wav')
// resolves to course/video/audio/x.wav.
// Assumes the two repos are siblings.
Config.setPublicDir('../course/video')
