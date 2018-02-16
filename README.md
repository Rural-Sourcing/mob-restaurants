# Mobile Restaurant Review System

A training project to develop Java Spring Boot and Angular skills.


## Building on:
* Java back-end with Spring
* MySQL database
* Utilize AngularJS on client side
* Build client/server unit tests
* Build regression testing

Check with IT to see if there is an internal JIRA (or like) account you can use to create User Stories and Tasks to manage each step of the project.


## Features:
* description of restaurant
* note whether preferred to walk or drive there
* cuisine types (multi-select; include coffee shop, tea shop, dessert, in the types)
* note whether vegetarian or vegan friendly
* walking distance from the office
* driving distance from the office
* price category
* Google Maps integration
* allow reviews
* allow photos of building/dining area/location
* allow photos of menu items as a separate category than building photos
* open hours
* good for groups of what size?

## Angular / Spring Boot Integration Log
* Create a new Maven project in Eclipse or Spring Tool Suite (STS)
* Verify the basic Spring Application is working
* Use git bash to navigate to the project's root
* Initiate the repository for the project: `git init`
* If you haven't already, install node and angular-cli globally (just makes life easier).
* Now run `ng new client --minimal` to create a new angular project.
** If the command isn't registered with git.bash you may need to run it from the windows power shell. It depends on how your paths to node are setup.

Now for the merger process.

```
cat client/.gitignore >> .gitignore
```
This merges the git ignore file of angular into the tail of Maven's.

```
rm -rf client/node* client/src/favicon.ico client/.gitignore
```

We are deleting the node resources angular pulled in at install for now. Don't worry, they'll be repulled by Maven in a moment.  Also we get rid of Angular's favicon.ico since spring will serve one by default. Then we delete the angular gitignore.  Although not in the above command, if Angular started a .git repo we need to delete that too. That will only happen if the Maven level git repository wasn't initialized.

```
sed -i '/node_/anode/' .gitignore
```

Adds ignoring of the node directory within our project.  Maven will be pulling down it's own copy of node for the checkout process - it will need this on the integration testing server an possibly on the production server during deployment.

```
mv client/src client/js
```

To prevent intermingling of Java and JavaScript sourcefiles we move the js source into new directory.

```
cp -rf client/* .
cp client/.??* .
```

This is two commands. The first copies all non-hidden files from client to root, the second copies the hidden files.

```
rm -rf client
```

And the Angular project directory should now be empty, so we delete it.

Now we need to tell Maven how to build Angular.  Put the following in the `pom.xml`

```
<build>
		<resources>
			<resource>
				<directory>dist</directory>
			</resource>
		</resources>
		<plugins>
			<plugin>
				<groupId>com.github.eirslett</groupId>
				<artifactId>frontend-maven-plugin</artifactId>
				<version>1.6</version>
				<configuration>
					<nodeVersion>v9.2.0</nodeVersion>
					<yarnVersion>v1.3.2</yarnVersion>
				</configuration>
				<executions>
					<execution>
						<id>install node and yarn</id>
						<goals>
							<goal>install-node-and-yarn</goal>
						</goals>
						<phase>generate-resources</phase>
					</execution>
					<execution>
						<id>yarn install</id>
						<goals>
							<goal>yarn</goal>
						</goals>
						<configuration>
							<arguments>install</arguments>
						</configuration>
					</execution>
					<execution>
						<id>yarn lint</id>
						<goals>
							<goal>yarn</goal>
						</goals>
						<configuration>
							<arguments>lint</arguments>
						</configuration>
					</execution>
					<execution>
						<id>yarn build</id>
						<goals>
							<goal>yarn</goal>
						</goals>
						<phase>generate-resources</phase>
						<configuration>
							<arguments>build</arguments>
						</configuration>
					</execution>
				</executions>
			</plugin>
		</plugins>
	</build>
```

Almost there.  Next Angular needs to be informed about the changes to it's build environment. Open the `.angular-cli.json` file.

```
  "apps": [
    {
      "root": "js",
      "outDir": "dist/META-INF/resources",
 ```
 
 This tells angular were to find its typescript files, and where to build them too. We have to use a path that includes META-INF/resources in order for Maven to properly transfer the files to the project jar file.
 
Later in the same file we need to tell the linter to look in js instead of src

```
  "lint": [
    {
      "project": "js/tsconfig.app.json",
      "exclude": "**/node_modules/**"
    },
    {
      "project": "js/tsconfig.spec.json",
      "exclude": "**/node_modules/**"
    },
```

And that's all.  Tell Eclipse to update the project or run `mvn generate-resources` to trigger a build of the angular files. Then navigate to `http://localhost:8080` and you should now see the Angular base screen instead of the Spring Boot default.