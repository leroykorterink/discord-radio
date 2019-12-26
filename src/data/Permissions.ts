enum BotPermissions {
  // Voice permissions
  Connect = 1 << 20,
  Speak = 1 << 21,
  MuteMember = 1 << 22,
  DeafenMember = 1 << 23,
  MoveMember = 1 << 24,
  UseVoiceActivity = 1 << 25,
  PrioritySpeaker = 1 << 8
}

export default BotPermissions;
