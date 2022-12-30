--CREATE TABLE [dbo].[Users](
--    [UserID] [int] IDENTITY(1,1) NOT NULL,
--    [UserFullName] [varchar](100) NOT NULL,
--    [DOJ] [date] NOT NULL,
--    [UserEmail] [varchar](100) NOT NULL,
--	  [UserProfile] [varchar](100) NOT NULL,
--	  [UserPassword] [varchar](100) NOT NULL,
-- CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
--(
--    [UserID] ASC
--)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
--) ON [PRIMARY]
--GO

SELECT * FROM  dbo.Users