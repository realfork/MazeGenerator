/// <reference types="../CTAutocomplete" />
import { generateMaze } from "./RecursiveDivision"

register("command", (...args) => {
  if (!Client.getMinecraft().func_71387_A()) return ChatLib.chat("§l§5[Maze§l§dGenerator] §r> This module is only usable in singleplayer! It will get you banned on most servers!")
  if (!args || parseInt(args[0]) == null || parseInt(args[0]) % 4 != 0) return ChatLib.chat("§l§5[Maze§l§dGenerator] §r> Please use a multiple of 4 for your maze size!")
  let size = parseInt(args[0])

  const maze = generateMaze(size)

  new Thread(() => {
    // Caches coordinates where the command was first ran
    let cachedPlayerX = Player.getX()
    let cachedPlayerY = Player.getY()
    let cachedPlayerZ = Player.getZ()

    for (let x = 0; x < size; x++) {
      for (let z = 0; z < size; z++) {
        // Next pos
        pos = new net.minecraft.util.BlockPos(cachedPlayerX - (size / 2) + x, cachedPlayerY, cachedPlayerZ - (size / 2) + z)
      
        // Place walls / air
        for (let y = 0; y < 3; y++) World.getWorld().func_175656_a(pos.func_177981_b(y), maze[x][z] == 1 ? net.minecraft.init.Blocks.field_150433_aE.func_176223_P() : net.minecraft.init.Blocks.field_150350_a.func_176223_P())
        
        // Place floor
        if (maze[x][z] == 0) World.getWorld().func_175656_a(new net.minecraft.util.BlockPos(cachedPlayerX - (size / 2) + x, cachedPlayerY - 1, cachedPlayerZ - (size / 2) + z), net.minecraft.init.Blocks.field_150322_A.func_176223_P())
        Thread.sleep(1)
      }
    }
  }).start()

  // Writing Image
  const image = new java.awt.image.BufferedImage(size, size, java.awt.image.BufferedImage.TYPE_INT_RGB);
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      if (maze[x][y] == 1) image.setRGB(x, y, java.awt.Color.BLACK.getRGB());
      else image.setRGB(x, y, java.awt.Color.WHITE.getRGB());
    }
  }
  javax.imageio.ImageIO.write(image, "png", new java.io.File(`./config/ChatTriggers/modules/MazeGenerator/Mazes/Maze${new java.io.File("./config/ChatTriggers/modules/MazeGenerator/Mazes").list().length + 1}.png`))
}).setName("maze") 