FROM ubuntu:xenial

MAINTAINER Franziskus Kiefer <franziskuskiefer@gmail.com>
# Based on the HACL* image from Benjamin Beurdouche and
# the original F* formula with Daniel Fabian

# Pinned versions of HACL* (F* and KreMLin are pinned as submodules)
ENV haclrepo https://github.com/mitls/hacl-star.git

# Define versions of dependencies
ENV opamv 4.04.2
ENV haclversion daa7e159f0adf252b5e6962967bc0f27dbac243b

# Install required packages and set versions
RUN apt-get -qq update
RUN apt-get install --yes sudo libssl-dev libsqlite3-dev g++-5 gcc-5 m4 make opam pkg-config python libgmp3-dev cmake curl libtool-bin autoconf wget
RUN update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-5 200
RUN update-alternatives --install /usr/bin/g++ g++ /usr/bin/g++-5 200

# Create user
RUN useradd -ms /bin/bash worker
RUN echo "worker ALL=(ALL:ALL) NOPASSWD:ALL" >> /etc/sudoers
WORKDIR /home/worker

# Add build and test scripts.
ADD bin /home/worker/bin
RUN chmod +x /home/worker/bin/*
USER worker

# Prepare build (OCaml packages)
ENV OPAMYES true
RUN opam init
RUN echo ". /home/worker/.opam/opam-init/init.sh > /dev/null 2> /dev/null || true" >> .bashrc
RUN opam switch -v ${opamv}
RUN opam install ocamlfind batteries sqlite3 fileutils yojson ppx_deriving_yojson zarith pprint menhir ulex process fix wasm stdint

# Get the HACL* code
RUN git clone ${haclrepo} hacl-star
RUN git -C hacl-star checkout ${haclversion}

# Prepare submodules, and build, verify, test, and extract c code
# This caches the extracted c code (pins the HACL* version). All we need to do
# on CI now is comparing the code in this docker image with the one in NSS.
RUN opam config exec -- make -C hacl-star prepare -j$(nproc)
ENV PATH "/home/worker/hacl-star/dependencies/z3/bin:$PATH"
RUN make -C hacl-star verify-nss -j$(nproc)
RUN make -C hacl-star -f Makefile.build snapshots/nss -j$(nproc)
RUN KOPTS="-funroll-loops 5" make -C hacl-star/code/curve25519 test -j$(nproc)
RUN make -C hacl-star/code/salsa-family test -j$(nproc)

# Get clang-format-3.9
RUN curl -LO http://releases.llvm.org/3.9.1/clang+llvm-3.9.1-x86_64-linux-gnu-ubuntu-16.04.tar.xz
RUN curl -LO http://releases.llvm.org/3.9.1/clang+llvm-3.9.1-x86_64-linux-gnu-ubuntu-16.04.tar.xz.sig
# Verify the signature.
RUN gpg --keyserver pool.sks-keyservers.net --recv-keys B6C8F98282B944E3B0D5C2530FC3042E345AD05D
RUN gpg --verify *.tar.xz.sig
# Install into /usr/local/.
RUN sudo tar xJvf *.tar.xz -C /usr/local --strip-components=1
# Cleanup.
RUN rm *.tar.xz*

# Cleanup
RUN rm -rf ~/.ccache ~/.cache
RUN rm -rf /home/worker/hacl-star/dependencies
RUN sudo apt-get autoremove -y
RUN sudo apt-get clean
RUN sudo apt-get autoclean
