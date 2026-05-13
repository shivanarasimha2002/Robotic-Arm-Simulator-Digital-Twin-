import bpy #blender API for python
import math
import mysql.connector as sc

db=sc.connect(
  host="localhost",
  user="root",
  password="",
  database="blender")
cursor=db.cursor()

cursor.execute("SELECT `addname`, `removename`, `xl`, `yl`, `zl`, `x-dist`, `y-dist`, `z-dist` FROM `workvolume` WHERE 1")
result = cursor.fetchall()
x = result[0][2]/100
y = result[0][3]/100
z = result[0][4]/100
xdist = result[0][5]/100
ydist = result[0][6]/100
zdist = result[0][7]/100
name = result[0][0]
rname = result[0][1]
#open blender file
bpy.ops.wm.open_mainfile(filepath="./public/model.blend")

#take inputs
#left1=int(input("Enter left 1 angle: "))
#left2=int(input("Enter left 2 angle: "))
#right1=int(input("Enter right 1 angle: "))
#right2=int(input("Enter right 2 angle: "))
#right3=int(input("Enter right 3 angle: "))
#right4=int(input("Enter right 4 angle: "))
#x=int(input("Enter X value:"))
#y=int(input("Enter y value:"))

if x>0 and y>0 and z>0 and name != '0' :
 #add cube at location
 bpy.ops.mesh.primitive_cube_add(location=(xdist+(x/2),ydist+(y/2),zdist+(z/2)))
 #set size of cube
 bpy.context.active_object.dimensions = (x,y,z)
 bpy.context.active_object.name = name
 #delete cube
if rname != '0' :
 bpy.ops.object.select_all(action='DESELECT')
 bpy.data.objects[rname].select_set(True)
 bpy.ops.object.delete()
 cursor.execute("UPDATE `workvolume` SET `removename`='0' WHERE 1")

#save as gltf
scene = bpy.context.scene
bpy.ops.export_scene.gltf(filepath="./public/scene.glb")

#save blender file
bpy.ops.wm.save_as_mainfile(filepath=bpy.data.filepath)
