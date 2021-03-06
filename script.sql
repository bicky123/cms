USE [CMS-Node]
GO
/****** Object:  Table [dbo].[Login_Info]    Script Date: 11-12-2019 10:28:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Login_Info](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[UserId] [nvarchar](250) NULL DEFAULT (newid()),
	[Email] [nvarchar](250) NULL,
	[Phone] [nvarchar](250) NULL,
	[Password] [nvarchar](250) NULL,
	[IsActive] [bit] NULL DEFAULT ((1)),
	[IsDelete] [bit] NULL DEFAULT ((0)),
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Roles]    Script Date: 11-12-2019 10:28:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Roles](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[RoleId] [nvarchar](250) NULL DEFAULT (newid()),
	[Role] [nvarchar](250) NULL,
	[Description] [nvarchar](500) NULL,
	[Date] [datetime] NULL DEFAULT (getdate()),
	[IsActive] [bit] NULL DEFAULT ((1)),
	[IsDelete] [bit] NULL DEFAULT ((0)),
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[User_Info]    Script Date: 11-12-2019 10:28:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User_Info](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[UserId] [nvarchar](250) NULL,
	[FirstName] [nvarchar](250) NULL,
	[LastName] [nvarchar](250) NULL,
	[Email] [nvarchar](250) NULL,
	[Phone] [nvarchar](250) NULL,
	[Gender] [nvarchar](50) NULL,
	[Matric] [bit] NULL,
	[Gradution] [bit] NULL,
	[IsActive] [bit] NULL DEFAULT ((1)),
	[IsDelete] [bit] NULL DEFAULT ((0)),
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[UserInRoles]    Script Date: 11-12-2019 10:28:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserInRoles](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[UserId] [nvarchar](250) NULL,
	[RoleId] [nvarchar](250) NULL,
	[Date] [datetime] NULL CONSTRAINT [DF_UserInRoles_Date]  DEFAULT (getdate())
) ON [PRIMARY]

GO
SET IDENTITY_INSERT [dbo].[Login_Info] ON 

INSERT [dbo].[Login_Info] ([Id], [UserId], [Email], [Phone], [Password], [IsActive], [IsDelete]) VALUES (1, N'83B53DB2-A792-4A71-9C09-3C423049E2D1', N'kumarbicky238@gmail.com', N'8540989035', N'123456', 1, 0)
INSERT [dbo].[Login_Info] ([Id], [UserId], [Email], [Phone], [Password], [IsActive], [IsDelete]) VALUES (2, N'5681F4DD-6FEC-4408-8976-68156CEC663E', N'sonu@gmail.com', N'8409570523', N'123456', 1, 0)
SET IDENTITY_INSERT [dbo].[Login_Info] OFF
SET IDENTITY_INSERT [dbo].[Roles] ON 

INSERT [dbo].[Roles] ([Id], [RoleId], [Role], [Description], [Date], [IsActive], [IsDelete]) VALUES (1, N'E7B910B1-BB09-4E77-A11D-60A4CB975632', N'Administration', N'This is Only for administration block', CAST(N'2019-11-14 09:14:32.070' AS DateTime), 1, 0)
INSERT [dbo].[Roles] ([Id], [RoleId], [Role], [Description], [Date], [IsActive], [IsDelete]) VALUES (2, N'83F764BA-7AD6-4A2C-812E-5BF64BC86500', N'Employee', N'This is Only for administration block', CAST(N'2019-11-14 09:14:32.070' AS DateTime), 1, 0)
INSERT [dbo].[Roles] ([Id], [RoleId], [Role], [Description], [Date], [IsActive], [IsDelete]) VALUES (3, N'CC848BF5-6D3D-40E0-A336-DF9880E1AE78', N'User', N'This is Only for administration block', CAST(N'2019-11-14 09:14:32.070' AS DateTime), 1, 0)
SET IDENTITY_INSERT [dbo].[Roles] OFF
SET IDENTITY_INSERT [dbo].[User_Info] ON 

INSERT [dbo].[User_Info] ([Id], [UserId], [FirstName], [LastName], [Email], [Phone], [Gender], [Matric], [Gradution], [IsActive], [IsDelete]) VALUES (1, N'83B53DB2-A792-4A71-9C09-3C423049E2D1', N'Bicky', N'Kumar', N'kumarbicky238@gmail.com', N'8540989035', N'M', 1, 0, 1, 0)
INSERT [dbo].[User_Info] ([Id], [UserId], [FirstName], [LastName], [Email], [Phone], [Gender], [Matric], [Gradution], [IsActive], [IsDelete]) VALUES (2, N'5681F4DD-6FEC-4408-8976-68156CEC663E', N'Sonu', N'Kumar', N'sonu@gmail.com', N'8409570523', N'M', 1, 1, 1, 0)
SET IDENTITY_INSERT [dbo].[User_Info] OFF
SET IDENTITY_INSERT [dbo].[UserInRoles] ON 

INSERT [dbo].[UserInRoles] ([Id], [UserId], [RoleId], [Date]) VALUES (1, N'83B53DB2-A792-4A71-9C09-3C423049E2D1', N'CC848BF5-6D3D-40E0-A336-DF9880E1AE78', CAST(N'2019-11-14 10:51:40.323' AS DateTime))
INSERT [dbo].[UserInRoles] ([Id], [UserId], [RoleId], [Date]) VALUES (2, N'5681F4DD-6FEC-4408-8976-68156CEC663E', N'CC848BF5-6D3D-40E0-A336-DF9880E1AE78', CAST(N'2019-11-14 10:53:07.870' AS DateTime))
INSERT [dbo].[UserInRoles] ([Id], [UserId], [RoleId], [Date]) VALUES (3, N'83B53DB2-A792-4A71-9C09-3C423049E2D1', N'E7B910B1-BB09-4E77-A11D-60A4CB975632', CAST(N'2019-11-17 20:30:48.070' AS DateTime))
INSERT [dbo].[UserInRoles] ([Id], [UserId], [RoleId], [Date]) VALUES (4, N'83B53DB2-A792-4A71-9C09-3C423049E2D1', N'83F764BA-7AD6-4A2C-812E-5BF64BC86500', CAST(N'2019-11-17 20:31:18.177' AS DateTime))
SET IDENTITY_INSERT [dbo].[UserInRoles] OFF
/****** Object:  StoredProcedure [dbo].[usp_GetAllRoleByUserId]    Script Date: 11-12-2019 10:28:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

--usp_GetAllRoleByUserId '83B53DB2-A792-4A71-9C09-3C423049E2D1'
Create Procedure [dbo].[usp_GetAllRoleByUserId]
@UserId Nvarchar(250)
As
Begin
	If Exists(Select Id From UserInRoles Where UserId = @UserId)
	Begin
		Select Role from Roles R Inner Join UserInRoles UIR On R.RoleId = UIR.RoleId And UIR.UserId = @UserId  Where UIR.UserId = @UserId
	End
	Else
	Begin
		Select '' As Role
	End
End
GO
/****** Object:  StoredProcedure [dbo].[usp_GetUserProfileByUserId]    Script Date: 11-12-2019 10:28:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--usp_GetUserProfileByUserId
Create Procedure [dbo].[usp_GetUserProfileByUserId]
@Message nvarchar(50) Output,
@UserId nvarchar(250) =''
As
Begin
	If Exists(Select Id From User_Info Where UserId = @UserId And IsActive =1)
		Begin
			Select ISNULL(FirstName,'') As FirstName , ISNULL(LastName,'') As LastName , ISNULL(Email,'') As Email , ISNULL(Phone,'') As Phone , ISNULL(Gender,'') As Gender ,ISNULL(Matric,0) As Matric , ISNULL(Gradution,0) As Gradution from User_Info Where UserId = @UserId And IsActive =1

			Set @Message = 'yes'
		End
	Else
		Begin
			Set @Message = 'no'
		End

End
GO
/****** Object:  StoredProcedure [dbo].[usp_Login]    Script Date: 11-12-2019 10:28:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--usp_Login 'kumarbicky238@gmail.com','123456'
CREATE procedure [dbo].[usp_Login]
@UserName nvarchar(250)='',
@Password nvarchar(250) = ''
As
Begin
	
	IF Exists(Select Id From Login_Info Where Email = @UserName And Password = @Password And IsActive = 1)
	Begin
		Select ISNULL(UserId,'') As UserId From Login_Info Where Email = @UserName And Password = @Password And IsActive = 1
	End

	Else
	Begin
		Select '' As UserId 
	End
	
End


GO
/****** Object:  StoredProcedure [dbo].[usp_MapRoleInUser]    Script Date: 11-12-2019 10:28:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--usp_MapRoleInUser'83B53DB2-A792-4A71-9C09-3C423049E2D1','CC848BF5-6D3D-40E0-A336-DF9880E1AE78'
CREATE Procedure [dbo].[usp_MapRoleInUser]
@UserId	nvarchar(250)='',
@RoleId	nvarchar(250)=''
As
Begin
	IF Exists(Select Id From UserInRoles Where UserId = @UserId And RoleId = @RoleId)
	Begin
		Select 0 as result
	End
	Else
	Begin
		Insert Into UserInRoles (UserId,RoleId) Values (@UserId,@RoleId)
		Select IDENT_CURRENT('UserInRoles') as result
		
	End
End
GO
/****** Object:  StoredProcedure [dbo].[usp_Registration]    Script Date: 11-12-2019 10:28:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE Procedure [dbo].[usp_Registration]
@FirstName nvarchar(250) = '',
@LastName nvarchar(250) = '',
@Email nvarchar(250) = '',
@Phone nvarchar(50) = '',
@Gender nvarchar(50) = '',
@Matric bit = 0,
@Gradution bit = 0,
@Password nvarchar(50) =''
As
Begin
	If Exists(Select Id From Login_Info Where Email = @Email Or Phone = @Phone)
	Begin
		Select '' as UserId
	End
	Else
	Begin
		Insert Into Login_Info(Email,Phone,Password) Values (@Email,@Phone,@Password)

		Declare @UserId nvarchar(250)

		Select @UserId = UserId From Login_Info Where Email=@Email And Phone = @Phone And Password = @Password
		Insert Into User_Info(UserId,FirstName,LastName,Email,Phone,Gender,Matric,Gradution) Values (@UserId,@FirstName,@LastName,@Email,@Phone,@Gender,@Matric,@Gradution)

		select UserId from Login_Info Where Email = @Email And Phone = @Phone And Password = @Password


	End
End
GO
