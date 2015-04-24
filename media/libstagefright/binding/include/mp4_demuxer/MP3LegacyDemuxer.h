/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

#ifndef MP3_LEGACY_DEMUXER_H_
#define MP3_LEGACY_DEMUXER_H_

#include "mp4_demuxer.h"
#include "MP3TrackDemuxer.h"

namespace mp4_demuxer {

class MP3LegacyDemuxer : public MP4Demuxer
{
public:
  NS_INLINE_DECL_THREADSAFE_REFCOUNTING(MP3LegacyDemuxer)

  MP3LegacyDemuxer(Stream* aSource)
    : MP4Demuxer(aSource, nullptr) {
    mTrackDemuxer = new MP3Demuxer(aSource);
  }

  bool Init() {
    bool ok = mTrackDemuxer->Init();
    if (!ok) {
      return false;
    }
    nsRefPtr<mozilla::MediaRawData> sample = mTrackDemuxer->DemuxSample();
    return !!sample;
  }

  Microseconds Duration() { return mTrackDemuxer->Duration(); }
  bool CanSeek() { return true; }

  bool HasValidAudio() { return true; }
  bool HasValidVideo() { return false; }

  void SeekAudio(Microseconds aTime) {}
  void SeekVideo(Microseconds aTime) {}

  // DemuxAudioSample and DemuxVideoSample functions
  // return nullptr on end of stream or error.
  already_AddRefed<mozilla::MediaRawData> DemuxAudioSample() { return nullptr; }
  already_AddRefed<mozilla::MediaRawData> DemuxVideoSample() { return nullptr; }

  const CryptoFile& Crypto() { return mCrypto; }
  const mozilla::AudioInfo& AudioConfig() {
    mTrackDemuxer->UpdateConfig(mAudioConfig);
    return mAudioConfig;
  }
  const mozilla::VideoInfo& VideoConfig() { return mVideoConfig; }

  void UpdateIndex(const nsTArray<mozilla::MediaByteRange>& aByteRanges) {}

  void ConvertByteRangesToTime(const nsTArray<mozilla::MediaByteRange>& aByteRanges,
                               nsTArray<Interval<Microseconds>>* aIntervals)
  {}

  int64_t GetEvictionOffset(Microseconds aTime) { return -1; }

  // Returns timestamp of next keyframe, or -1 if demuxer can't
  // report this.
  Microseconds GetNextKeyframeTime() { return -1; }

  MP3Demuxer* mTrackDemuxer;

private:
  ~MP3LegacyDemuxer() {};

  mozilla::AudioInfo mAudioConfig;
  mozilla::VideoInfo mVideoConfig;
  CryptoFile mCrypto;
};

}
#endif
