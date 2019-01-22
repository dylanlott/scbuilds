package main

import (
	"fmt"

	"github.com/icza/mpq"
	"github.com/icza/s2prot"
)

func main() {
	// r, err := rep.NewFromFile("./replay2.SC2Replay")
	// if err != nil {
	// 	fmt.Printf("Failed to open file: %v\n", err)
	// 	return
	// }
	m, err := mpq.NewFromFile("replay2.SC2Replay")
	if err != nil {
		panic(err)
	}
	defer m.Close()

	header := s2prot.DecodeHeader(m.UserData())
	ver := header.Structv("version")

	fmt.Printf("Version: %d.%d.%d.%d\n",
		ver.Int("major"), ver.Int("minor"), ver.Int("revision"), ver.Int("build"))

	baseBuild := int(ver.Int("baseBuild"))

	fmt.Printf("Base build: %d\n", baseBuild)

	p := s2prot.GetProtocol(baseBuild)
	fmt.Printf("p: %+v\n", p)
}
