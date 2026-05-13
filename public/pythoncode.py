import bpy #blender API for python
import math
import mysql.connector as sc

db=sc.connect(
  host="localhost",
  user="root",
  password="",
  database="blender")
cursor=db.cursor()

cursor.execute("SELECT left1,left2,right1,right2,right3,right4,x,y FROM position")
result = cursor.fetchall()
left1 = result[0][0]
left2 = result[0][1]
right1 = result[0][2]
right2 = result[0][3]
right3 = result[0][4]
right4 = result[0][5]
x = result[0][6]
y = result[0][7]

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

#add keyframes at current location
bpy.data.objects["left1"].keyframe_insert(data_path="rotation_euler",frame=1)
bpy.data.objects["left2"].keyframe_insert(data_path="rotation_euler",frame=1)
bpy.data.objects["right1"].keyframe_insert(data_path="rotation_euler",frame=1)
bpy.data.objects["right2"].keyframe_insert(data_path="rotation_euler",frame=1)
bpy.data.objects["right3"].keyframe_insert(data_path="rotation_euler",frame=1)
bpy.data.objects["right4"].keyframe_insert(data_path="rotation_euler",frame=1)
bpy.data.objects["carriagex"].keyframe_insert(data_path="location",frame=1)
bpy.data.objects["carriagey"].keyframe_insert(data_path="location",frame=1)
#end of add keyframes

#activate object (not select, activate) and rotate
bpy.data.objects["left1"].rotation_euler[2] = 1.5708+math.radians(left1)

bpy.data.objects["left2"].rotation_euler[0] = -1.5708+math.radians(left2)

bpy.data.objects["right1"].rotation_euler[2] = 1.5708+math.radians(right1)

bpy.data.objects["right2"].rotation_euler[0] = -1.5708+math.radians(right2)

bpy.data.objects["right3"].rotation_euler[0] = 0+math.radians(right3)

bpy.data.objects["right4"].rotation_euler[2] = 1.5708+math.radians(right4)

#translations
bpy.data.objects["carriagex"].location.x -= x/100
bpy.data.objects["carriagey"].location.y += y/100

#add keyframes at new location
bpy.data.objects["left1"].keyframe_insert(data_path="rotation_euler",frame=160)
bpy.data.objects["left2"].keyframe_insert(data_path="rotation_euler",frame=160)
bpy.data.objects["right1"].keyframe_insert(data_path="rotation_euler",frame=160)
bpy.data.objects["right2"].keyframe_insert(data_path="rotation_euler",frame=160)
bpy.data.objects["right3"].keyframe_insert(data_path="rotation_euler",frame=160)
bpy.data.objects["right4"].keyframe_insert(data_path="rotation_euler",frame=160)
bpy.data.objects["carriagex"].keyframe_insert(data_path="location",frame=160)
bpy.data.objects["carriagey"].keyframe_insert(data_path="location",frame=160)
#end of add keyframes

#save as gltf
scene = bpy.context.scene
bpy.ops.export_scene.gltf(filepath="./public/scene.glb")

#save blender file
bpy.ops.wm.save_as_mainfile(filepath=bpy.data.filepath)
