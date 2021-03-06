/* -*- Mode: C++; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- */
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

#include "mozilla/Attributes.h"

#ifndef _MSC_VER // Not supported by clang-cl yet

// When running with AddressSanitizer, we need to explicitly set some
// options specific to our codebase to prevent errors during runtime.
// To override these, set the ASAN_OPTIONS environment variable.
//
// Currently, these are:
//
//   allow_user_segv_handler=1 - Tell ASan to allow our code to use its
//   own SIGSEGV handlers. This is required by ASM.js internally.
//
//   alloc_dealloc_mismatch=0 - Disable alloc-dealloc mismatch checking
//   in ASan. This is required because we define our own new/delete
//   operators that are backed by malloc/free. If one of them gets inlined
//   while the other doesn't, ASan will report false positives.
//
//   detect_leaks=0 - Disable LeakSanitizer. This is required because
//   otherwise leak checking will be enabled for various building and
//   testing executables where we don't care much about leaks. Enabling
//   this will also likely require setting LSAN_OPTIONS with a suppression
//   file, as in build/sanitizers/lsan_suppressions.txt.
//
//   allocator_may_return_null=1 - Tell ASan to return NULL when an allocation
//   fails instead of aborting the program. This allows us to handle failing
//   allocations the same way we would handle them with a regular allocator and
//   also uncovers potential bugs that might occur in these situations.
//
//   log_path=/tmp/ff_asan_log - When running with the ASan reporter extension
//   enabled (MOZ_ASAN_REPORTER), then we need to dump our logs to files
//   instead of stderr so the reporter extension can find it. Unfortunately,
//   this function is called so early at startup that we can't use the profile
//   directory or even ask XPCOM for a temporary directory. Since the extension
//   is only meant to run on Linux and Mac OSX for now, hardcoding /tmp is an
//   option that should work for most standard environments.
//
extern "C" MOZ_ASAN_BLACKLIST
const char* __asan_default_options() {
    return "allow_user_segv_handler=1:alloc_dealloc_mismatch=0:detect_leaks=0"
#ifdef MOZ_ASAN_REPORTER
           ":log_path=/tmp/ff_asan_log"
#endif
           ":allocator_may_return_null=1";
}

#endif
