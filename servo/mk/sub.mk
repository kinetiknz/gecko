# NOTE: the make magic can only compute transitive build dependencies,
# not transitive link flags. So, if A -> B -> C, must add A as a dep
# of C so the correct -L/path/to/A flag is generated for building C.

# NB. This should not be a problem once a real package system exists.

DEPS_rust-azure += \
	rust-geom

DEPS_rust-glut += \
	rust-opengles

DEPS_rust-layers += \
	rust-azure \
	rust-geom \
	rust-glut \
	rust-opengles

DEPS_sharegl += \
	rust-geom \
	rust-opengles

DEPS_rust-hubbub += \
	libhubbub

DEPS_rust-netsurfcss += \
	libcss \
	rust-wapcaplet

DEPS_rust-wapcaplet += \
	libwapcaplet

CFLAGS_rust-wapcaplet += \
	"-I$(S)src/libwapcaplet/include"

CFLAGS_mozjs += \
	"-I../mozjs/dist/include"

DEPS_rust-mozjs += \
	mozjs

CFLAGS_rust-mozjs += \
	"-I../mozjs/dist/include"

DEPS_libcss += \
    libwapcaplet \
    libparserutils

# Platform-specific dependencies
ifeq ($(CFG_OSTYPE),darwin)
DEPS_rust-azure += \
	rust-core-graphics \
	rust-core-foundation

DEPS_rust-layers += \
	rust-core-graphics

DEPS_rust-io-surface += \
	rust-core-foundation

DEPS_sharegl += \
	rust-core-foundation \
	rust-io-surface

DEPS_rust-core-text += \
	rust-core-foundation \
	rust-core-graphics
endif

ifeq ($(CFG_OSTYPE),linux)
DEPS_rust-azure += \
	rust-freetype

# See note at top of file
DEPS_rust-layers += \
	rust-freetype

endif