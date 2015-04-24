/* -*- Mode: C++; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- */
/* vim:set ts=2 sw=2 sts=2 et cindent: */
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

#include "MP3Decoder.h"
#include "MP4Reader.h"
#include "MediaDecoderStateMachine.h"
#include "mozilla/Preferences.h"

#ifdef MOZ_WIDGET_ANDROID
#include "AndroidBridge.h"
#endif

namespace mozilla {

MediaDecoderStateMachine* MP3Decoder::CreateStateMachine()
{
  return new MediaDecoderStateMachine(this, MP4Reader::CreateMP3Reader(this));
}

static bool
IsAndroid5()
{
#ifdef MOZ_WIDGET_ANDROID
  // We need android.media.MediaCodec which exists in API level 16 and
  // higher, and (for now) only enable this where the older MP3 demuxer is
  // not available, which is Android 5.0 onwards.
  return MediaDecoder::IsOmxAsyncEnabled() && AndroidBridge::Bridge()->GetAPIVersion() >= 21;
#else
  return false;
#endif
}

/* static */
bool
MP3Decoder::IsEnabled()
{
  return IsAndroid5() || Preferences::GetBool("media.mp3.enabled");
}

} // namespace mozilla
