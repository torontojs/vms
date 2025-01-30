/**
 * HAL - Hypertext Application Language
 *
 * This provides a lightweight way of describe relationships between http resources
 *
 * @see https://stateless.co/hal_specification.html
 */
declare namespace HAL {
	interface Link {
		/**
		 * The link URL
		 */
		href: string;
		/**
		 * A flag specifying if the URL is deprecated
		 */
		deprecation?: boolean;
	}

	interface Response {
		/**
		 * A list of links providing information about related data for this resource.
		 */
		// eslint-disable-next-line @typescript-eslint/naming-convention
		_links: {
			/**
			 * Represents the URL for the current resource.
			 */
			self: Link
		};
	}

	interface PaginatedResponse {
		/**
		 * A list of links providing information about related data for this resource.
		 */
		// eslint-disable-next-line @typescript-eslint/naming-convention
		_links: {
			/**
			 * Represents the URL for the current resource.
			 */
			self: Link,
			/**
			 * The URL for the first resource.
			 * Note that this could be the same as the URL for the current resource.
			 */
			first: Link,
			/**
			 * The URL for the last resource.
			 * Note that this could be the same as the URL for the current resource.
			 */
			last: Link,
			/**
			 * The URL for the previous resource, if there is any.
			 */
			prev?: Link,
			/**
			 * The URL for the next resource, if there is any.
			 */
			next?: Link
		};
	}
}
